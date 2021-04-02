import { GetStaticProps } from 'next';

import { Photo } from 'models/photo';
import { Layout, Grid, Banner } from 'components';
import { api } from 'services/api';

type MainProps = {
  mainScreenPhotos: Photo[];
  gridPhotos: Photo[];
  error: string;
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
  try {
    const mainScreenPhotos = await api.photos.getMainScreenPhoto();
    const gridPhotos = await api.photos.getMainScreenPhoto();

    return {
      props: {
        mainScreenPhotos,
        gridPhotos,
        error: '',
      },
    };
  } catch (err) {
    return {
      props: {
        mainScreenPhotos: [],
        gridPhotos: [],
        error: err,
      },
    };
  }
};
