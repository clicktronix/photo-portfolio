import { GetStaticProps } from 'next';

import { AlbumPreview, Layout } from 'components';
import { Album } from 'models/album';

import styles from './AlbumsPage.module.scss';
import { Api } from 'services/api';

type AlbumsProps = {
  albums?: Album[];
  error?: '';
};

export default function AlbumsPage({ albums = [], error = '' }: AlbumsProps) {
  return (
    <Layout withFooter>
      <div className={styles.AlbumsPage}>
        {albums.map((x) => (
          <AlbumPreview {...x} key={x.name} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AlbumsProps> = async () => {
  const api = new Api();

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
        error: err,
      },
    };
  }
};
