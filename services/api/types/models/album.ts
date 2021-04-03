import { PhotoResponse } from './photo';

export type AlbumResponse = {
  id: number;
  name: string;
  description: string;
  photos: PhotoResponse[];
  preview?: PhotoResponse;
};
