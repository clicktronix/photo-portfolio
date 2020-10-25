import Gallery from 'react-photo-gallery';
import { useEffectOnce } from 'react-use';

import { usePhotos } from 'hooks/usePhotos';

export function Grid() {
  const { photos, fetchData } = usePhotos();

  useEffectOnce(() => fetchData);

  return <Gallery photos={photos} targetRowHeight={400} />;
}
