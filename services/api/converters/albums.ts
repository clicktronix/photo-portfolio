import { Album } from 'models/album';

import { AlbumResponse } from '../types/models/album';

export function convertServerAlbum(data: AlbumResponse): Album {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    photos: data.photos,
    preview: data.preview,
  };
}
