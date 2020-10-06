import Gallery from 'react-photo-gallery';
import EXIF from 'exif-js';

import i from 'public/photos/1.jpg';

import { photos } from './constants';

export function Grid() {
  const img = EXIF.readFromBinaryFile(i);

  console.log(img);

  return <Gallery photos={photos} />;
}
