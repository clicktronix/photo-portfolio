import { useEffect } from 'react';
import Gallery from 'react-photo-gallery';

import { usePhotos } from 'hooks/usePhotos';

export function Grid() {
  const { photos, fetchData } = usePhotos();

  useEffect(() => fetchData);

  return <Gallery photos={photos} targetRowHeight={400} />;
}
