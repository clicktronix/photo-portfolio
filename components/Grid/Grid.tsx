import React, { useCallback, useRef, useState } from 'react';
import Gallery, { PhotoClickHandler } from 'react-photo-gallery';
import cn from 'classnames';

import { Photo } from 'models/photo';
import { PhotoComponent, PhotoComponentProps } from 'components/Photo/Photo';
import { LightBox } from 'components/LightBox/LightBox';

import styles from './Grid.module.scss';
import { isServerSide } from 'helpers/isServerSide';

type GridProps = {
  photos: Photo[];
};

export const Grid = React.memo(({ photos }: GridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);

  const onPhotoClick: PhotoClickHandler<Photo> = (event, { photo }) => {
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
    ({ ...props }: PhotoComponentProps) => <PhotoComponent onLoad={onPhotoLoaded} {...props} />,
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
        <Gallery margin={2} targetRowHeight={650} photos={photos} onClick={onPhotoClick} renderImage={renderPhoto} />
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
