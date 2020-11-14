import { useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import cn from 'classnames';

import { CONFIG } from 'core/config';
import { generatorFromArr } from 'helpers/generatorFromArr';
import { Photo, PhotoResponse } from 'models/photo';
import { Layout } from 'components/Layout/Layout';

import styles from './Main.module.scss';

type MainProps = {
  photos: Photo[];
};

export default function Home({ photos }: MainProps) {
  const gen = useRef<Generator<Photo>>(generatorFromArr(photos));
  const [currentPhoto, setCurrentPhoto] = useState<IteratorResult<Photo | undefined>>();
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = () => {
    setIsLoading(false);
  };

  const getNextPhoto = () => {
    const iter = gen.current.next();
    if (iter?.done) {
      gen.current = generatorFromArr(photos);
      setCurrentPhoto(gen.current.next());
    } else {
      setCurrentPhoto(iter);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getNextPhoto();
    }, 5000);
  }, [currentPhoto]);

  return (
    <Layout withFooter={false} withHeader={false}>
      {currentPhoto?.value && (
        <img
          className={cn(styles.Photo, styles.smoothImage, {
            [styles.imageVisible]: !isLoading,
            [styles.imageHidden]: isLoading,
          })}
          src={currentPhoto.value.src}
          onLoad={onLoad}
          alt="banner"
        />
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
