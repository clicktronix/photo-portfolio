import { CONFIG } from 'core/config';
import { Photo, PhotoResponse } from 'models/photo';
import { GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/Layout/Layout';

import styles from './Main.module.scss';

type MainProps = {
  photos: Photo[];
};

function* generator<T>(photos: T[]) {
  yield* photos;
}

export default function Home({ photos }: MainProps) {
  const gen = useRef<Generator<Photo>>(generator(photos));
  const [currentPhoto, setCurrentPhoto] = useState<IteratorResult<Photo | undefined>>();

  useEffect(() => {
    setTimeout(() => {
      if (currentPhoto?.done) {
        gen.current = generator(photos);
      }
      setCurrentPhoto(gen.current.next());
    }, 5000);
  });

  return (
    <Layout withFooter={false} withHeader={false}>
      {currentPhoto?.value && (
        <img className={styles.Photo} src={currentPhoto.value.src} alt="banner" />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  const data: PhotoResponse[] = await fetch(`${CONFIG.baseUrl}/api/v1/photos/main-screen`)
    .then((res) => res.json())
    .catch((err) => err.json());
  const photos = data
    .filter((x) => Boolean(x.is_grid))
    .map((x) => ({
      width: x.width,
      height: x.height,
      src: x.img,
    }));

  return {
    props: {
      photos,
    },
  };
};
