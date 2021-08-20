import { GetStaticProps } from 'next';

import { AlbumPreview, Layout } from 'components';
import { Album } from 'models/album';

import styles from './AlbumsPage.module.scss';
import { api } from 'services/api';
import { Error } from 'components/Error/Error';

type AlbumsProps = { albums?: Album[]; error?: '' };

export default function AlbumsPage({ albums = [], error = '' }: AlbumsProps) {
  if (error) {
    return <Error title={error} />;
  }

  return (
    <Layout withFooter={false}>
      <div className={styles.AlbumsPage}>
        {albums.map((x) => (
          <AlbumPreview {...x} key={x.name} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AlbumsProps> = async () => {
  try {
    const albums = await api.albums.getAlbums();

    return {
      props: {
        albums,
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
