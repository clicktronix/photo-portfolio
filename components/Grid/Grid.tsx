import React from 'react';
import Gallery from 'react-photo-gallery';

import { Photo } from 'models/photo';
import styles from './Grid.module.scss';

type GridProps = {
  photos: Photo[];
};

export const Grid = React.memo(({ photos }: GridProps) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className={styles.Grid}>
      <Gallery photos={photos} targetRowHeight={600} margin={2} />
    </div>
  );
});

Grid.displayName = 'Grid';
