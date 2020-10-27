import { useState } from 'react';

import { getPhotos } from 'api/photos';
import { Photo } from 'models/photo';
import { useMountedState } from 'react-use';

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useMountedState();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getPhotos();
      isMounted() &&
        setPhotos(
          data
            .filter((x) => Boolean(x.is_grid))
            .map((x) => ({
              width: x.width,
              height: x.height,
              src: x.img,
            })),
        );
    } catch (err) {
      isMounted() && setError(err);
    } finally {
      isMounted() && setIsLoading(false);
    }
  };

  return { photos, isLoading, error, fetchData };
}
