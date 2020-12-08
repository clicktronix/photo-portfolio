import Gallery from 'react-photo-gallery';

import { Photo } from 'models/photo';
import { useCallback, useRef, useState } from 'react';
import { PhotoComponent } from 'components/Photo/Photo';

type GridProps = {
  photos: Photo[];
};

export function Grid({ photos }: GridProps) {
  const [, setIsLoading] = useState(false);
  const counter = useRef(0);

  const onPhotoLoaded = () => {
    counter.current += 1;
    if (counter.current >= photos.length) {
      setIsLoading(false);
    }
  };

  const renderPhoto = useCallback(
    (photo, ...props) => <PhotoComponent photo={photo} onLoad={onPhotoLoaded} {...props} />,
    [],
  );

  if (typeof window === 'undefined') {
    return null;
  }

  return <Gallery photos={photos} targetRowHeight={400} renderImage={renderPhoto} />;
}
