import { CONFIG } from 'core/config';
import { Photo, PhotoResponse } from 'models/photo';
import { GetStaticProps } from 'next';
import { Layout } from '../components/Layout/Layout';

import styles from './Main.module.scss';

type MainProps = {
  photos: Photo[];
};

export default function Home({ photos }: MainProps) {
  return (
    <Layout withFooter={false} withHeader={false}>
      <img className={styles.Photo} src={photos[0].src} alt="banner" />
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
