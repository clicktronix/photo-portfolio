import { Photo } from 'models/photo';

import { PhotoResponse } from '../types/models/photo';

export function convertServerPhoto(data: PhotoResponse): Photo {
  return {
    src: data.src,
    width: data.width,
    height: data.height,
  };
}
