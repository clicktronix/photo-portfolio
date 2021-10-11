import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Album } from 'models/album';

import styles from './AlbumPreview.module.scss';

type AlbumProps = Album;

export function AlbumPreview({ id, name, description, preview }: AlbumProps) {
  const [isAlbumHovered, setIsAlbumHovered] = useState(false);

  const onMouseEnterHandler = () => {
    setIsAlbumHovered(true);
  };

  const onMouseLeaveHandler = () => {
    setIsAlbumHovered(false);
  };

  return (
    <Link href={`/albums/${id}`}>
      <div
        className={styles.Album}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        role="article"
      >
        {preview && (
          <Image
            className={styles.PreviewPhoto}
            width={preview.width}
            height={preview.height}
            src={preview.src}
            alt="album-preview"
            key={preview.src}
          />
        )}
        {isAlbumHovered && <h1 className={styles.Name}>{name}</h1>}
        {isAlbumHovered && <p className={styles.Description}>{description}</p>}
      </div>
    </Link>
  );
}
