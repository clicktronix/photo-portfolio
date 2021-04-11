import { GetStaticProps } from 'next';

import { Photo } from 'models/photo';
import { Layout, Grid, Banner } from 'components';
import { api } from 'services/api';
import { Error } from 'components/Error/Error';

type MainProps = {
  mainScreenPhotos: Photo[];
  gridPhotos: Photo[];
  error?: string;
};

const PHOTO_MARGIN = 2;
const PHOTO_ROW_HEIGHT = 500;

export default function MainPage({ mainScreenPhotos, gridPhotos, error }: MainProps) {
  if (error) {
    return <Error title={error} />;
  }

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
    const gridPhotos = await api.photos.getGridPhoto();

    return {
      props: {
        mainScreenPhotos,
        gridPhotos,
      },
    };
  } catch (err) {
    return {
      props: {
        mainScreenPhotos: [],
        gridPhotos: [],
        error: err.message,
      },
    };
  }
};
