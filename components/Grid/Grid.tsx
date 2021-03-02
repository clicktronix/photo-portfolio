import React from 'react';
import Gallery from 'react-photo-gallery';

import { Photo } from 'models/photo';

type GridProps = {
  photos: Photo[];
};

export const Grid = React.memo(({ photos }: GridProps) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return <Gallery photos={photos} targetRowHeight={400} />;
});

Grid.displayName = 'Grid';
