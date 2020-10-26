import { PhotoResponse } from 'models/photo';

export async function getPhotos(): Promise<PhotoResponse[]> {
  return fetch('http://127.0.0.1:8000/api/v1/photos/').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<PhotoResponse[]>;
  });
}
