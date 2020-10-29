import { Grid } from 'components/Grid/Grid';
import { CONFIG } from 'core/config';
import { Photo, PhotoResponse } from 'models/photo';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Layout } from '../components/Layout/Layout';

type GridProps = {
  photos: Photo[];
};

export default function Home({ photos }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout withFooter>
      <Grid photos={photos} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<GridProps> = async () => {
  const data: PhotoResponse[] = await fetch(CONFIG.baseUrl)
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
