import Gallery from 'react-photo-gallery';

import { Photo } from 'models/photo';

type GridProps = {
  photos: Photo[];
};

export function Grid({ photos }: GridProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  return <Gallery photos={photos} targetRowHeight={400} />;
}
