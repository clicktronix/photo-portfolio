import { Photo } from './photo';

export type Album = {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
  preview?: Photo;
};
