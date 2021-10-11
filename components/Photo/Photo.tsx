import React from 'react';
import { RenderImageProps } from 'react-photo-gallery';

import { Photo } from 'models/photo';

import styles from './Photo.module.scss';

export type PhotoComponentProps = {
  onLoad: () => void;
} & RenderImageProps<Photo>;

export const PhotoComponent = React.memo(({ photo, index, margin, onClick, onLoad }: PhotoComponentProps) => {
  const onImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    onClick && onClick(e, { ...photo, index });
  };

  return (
    <img
      alt="grid-item"
      style={{ margin, height: photo.height, width: photo.width }}
      src={photo.src}
      width={photo.width}
      height={photo.height}
      key={photo.key}
      className={styles.Photo}
      onClick={onImageClick}
      onLoad={onLoad}
    />
  );
});

PhotoComponent.displayName = 'PhotoComponent';
