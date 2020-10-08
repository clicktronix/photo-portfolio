import Gallery from 'react-photo-gallery';

import { photos } from './constants';

export function Grid() {
  return <Gallery photos={photos} targetRowHeight={400} />;
}
