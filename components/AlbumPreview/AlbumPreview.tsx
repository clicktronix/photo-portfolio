import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Album } from 'models/album';

import styles from './AlbumPreview.module.scss';
import { Spinner } from 'components/Spinner/Spinner';

type AlbumProps = Album;

export function AlbumPreview({ id, name, description, preview }: AlbumProps) {
  const [isAlbumHovered, setIsAlbumHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onMouseEnterHandler = () => {
    setIsAlbumHovered(true);
  };

  const onMouseLeaveHandler = () => {
    setIsAlbumHovered(false);
  };

  const setIsLoaded = () => setIsLoading(false);

  return (
    <Link href={`/albums/${id}`} passHref>
      <div
        className={styles.Album}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        role="article"
      >
        {isLoading && <Spinner />}
        {preview && (
          <Image
            className={styles.PreviewPhoto}
            width={preview.width}
            height={preview.height}
            src={preview.src}
            alt="album-preview"
            key={preview.src}
            onLoadingComplete={setIsLoaded}
          />
        )}
        {isAlbumHovered && <h1 className={styles.Name}>{name}</h1>}
        {isAlbumHovered && <p className={styles.Description}>{description}</p>}
      </div>
    </Link>
  );
}
