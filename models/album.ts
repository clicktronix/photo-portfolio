import { Photo } from './photo';

export type AlbumResponse = {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
  preview?: Photo;
};

export type Album = {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
  preview?: Photo;
};
