import Gallery, { PhotoClickHandler } from 'react-photo-gallery';

import { Photo } from 'models/photo';
import { useCallback, useRef, useState } from 'react';
import { PhotoComponent, PhotoComponentProps } from 'components/Photo/Photo';
import { LightBox } from 'components/LightBox/LightBox';

type GridProps = {
  photos: Photo[];
};

export function Grid({ photos }: GridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const counter = useRef(0);

  const onPhotoClick: PhotoClickHandler<Photo> = (event, { photo }) => {
    setSelectedPhoto(photo);
  };

  const onPhotoLoaded = () => {
    counter.current += 1;
    if (counter.current >= photos.length) {
      setIsLoading(false);
    }
  };

  const renderPhoto = useCallback(
    ({ ...props }: PhotoComponentProps) => <PhotoComponent onLoad={onPhotoLoaded} {...props} />,
    [],
  );

  if (typeof window === 'undefined') {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Gallery
        photos={photos}
        targetRowHeight={400}
        onClick={onPhotoClick}
        renderImage={renderPhoto}
      />
      {selectedPhoto && (
        <LightBox isShow={Boolean(selectedPhoto)} currentPhoto={selectedPhoto} photos={photos} />
      )}
    </>
  );
}
