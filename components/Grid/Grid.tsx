import React, { useCallback, useRef, useState, MouseEvent } from 'react';
import Gallery, { GalleryProps } from 'react-photo-gallery';
import cn from 'classnames';

import { Photo } from 'models/photo';
import { isServerSide } from 'shared/helpers/isServerSide';

import { PhotoComponent, PhotoComponentProps } from '../Photo/Photo';
import { LightBox } from '../LightBox/LightBox';

import styles from './Grid.module.scss';

type GridProps = {
  photos: Photo[];
} & GalleryProps;

type OnPhotoClickHandler = (e: MouseEvent, el: { index: number; photo: Photo }) => void;

export const Grid = React.memo(({ photos, margin, targetRowHeight }: GridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  const onPhotoClick: OnPhotoClickHandler = (_, { photo }) => {
    setSelectedPhoto(photo);
  };

  const onPhotoLoaded = () => {
    counter.current += 1;
    if (counter.current >= photos.length) {
      setIsLoading(false);
      counter.current = 0;
    }
  };

  const onLightBoxClose = () => {
    setSelectedPhoto(null);
  };

  const renderPhoto = useCallback(
    ({ ...props }: Omit<PhotoComponentProps, 'onLoad'>) => <PhotoComponent {...props} onLoad={onPhotoLoaded} />,
    [],
  );

  if (isServerSide()) {
    return null;
  }

  return (
    <>
      <div
        className={cn({
          [styles.IsPhotosLoading]: isLoading,
        })}
      >
        <Gallery
          margin={margin}
          targetRowHeight={targetRowHeight}
          photos={photos}
          onClick={onPhotoClick}
          renderImage={renderPhoto}
        />
      </div>
      {selectedPhoto && (
        <LightBox
          isShow={Boolean(selectedPhoto)}
          currentPhoto={selectedPhoto}
          photos={photos}
          onClose={onLightBoxClose}
        />
      )}
    </>
  );
});

Grid.displayName = 'Grid';
