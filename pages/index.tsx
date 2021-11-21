import { GetStaticProps } from 'next';

import { Photo } from 'models/photo';
import { Layout, Grid, Banner, Error } from 'components';
import { api } from 'services/api';
import { handleErrorMessage } from 'shared/helpers/handleErrorMessage';
import { PHOTO_MARGIN, PHOTO_ROW_HEIGHT } from '../shared/constants';

type MainProps = {
  mainScreenPhotos: Photo[];
  gridPhotos: Photo[];
  error?: string;
};

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
        error: handleErrorMessage(err),
      },
    };
  }
};
