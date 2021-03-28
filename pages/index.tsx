import { GetStaticProps } from 'next';

import { CONFIG } from 'core/config';
import { Photo, PhotoResponse } from 'models/photo';
import { Layout } from 'components/Layout/Layout';
import { Grid } from 'components/Grid/Grid';
import { Banner } from 'components/Banner/Banner';

type MainProps = {
  mainScreenPhotos: Photo[];
  gridPhotos: Photo[];
};

const PHOTO_MARGIN = 2;
const PHOTO_ROW_HEIGHT = 500;

export default function Main({ mainScreenPhotos, gridPhotos }: MainProps) {
  return (
    <Layout withFooter={false}>
      <Banner photos={mainScreenPhotos} />
      <Grid margin={PHOTO_MARGIN} targetRowHeight={PHOTO_ROW_HEIGHT} photos={gridPhotos} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  const mainScreenResponse: PhotoResponse[] = await fetch(`${CONFIG.baseUrl}/api/v1/photos/main-screen`)
    .then((res) => res.json())
    .catch((err) => err);
  const mainScreenPhotos = mainScreenResponse.map((x) => ({
    width: x.width,
    height: x.height,
    src: x.src,
  }));

  const gridResponse: PhotoResponse[] = await fetch(`${CONFIG.baseUrl}/api/v1/photos/grid`)
    .then((res) => res.json())
    .catch((err) => err);
  const gridPhotos = gridResponse
    .filter((x) => Boolean(x.is_grid))
    .map((x) => ({
      width: x.width,
      height: x.height,
      src: x.src,
    }));

  return {
    props: {
      mainScreenPhotos,
      gridPhotos,
    },
  };
};
