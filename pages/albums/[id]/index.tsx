import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';

import { Album } from 'models/album';
import { Layout, Grid, BackButton, Error } from 'components';
import { api } from 'services/api';

import styles from './Album.module.scss';

type AlbumProps = {
  album?: Album;
  error?: string;
};

const PHOTO_MARGIN = 5;
const PHOTO_ROW_HEIGHT = 400;

export default function AlbumPage({ album, error = '' }: AlbumProps) {
  if (error) {
    return <Error title={error} />;
  }

  return (
    <Layout withFooter={false}>
      <BackButton className={styles.BackButton} />
      <div className={styles.GridWrapper}>
        <Grid margin={PHOTO_MARGIN} targetRowHeight={PHOTO_ROW_HEIGHT} photos={album ? album.photos : []} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const albumsResponse = await api.albums.getAlbums();

  const paths = albumsResponse.map((a) => ({
    params: { id: a.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<AlbumProps> = async ({ params }: GetStaticPropsContext) => {
  if (!params || !params?.id || Array.isArray(params?.id)) {
    return {
      props: {
        error: 'There is no params at the url',
      },
    };
  }
  const { id } = params;

  try {
    const album = await api.albums.getAlbum(id);

    return {
      props: {
        album,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
};
