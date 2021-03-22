import { GetStaticProps } from 'next';

import { AlbumPreview } from 'components/AlbumPreview/AlbumPreview';
import { CONFIG } from 'core/config';
import { Album } from 'models/album';
import { Layout } from 'components/Layout/Layout';

import styles from './AlbumsPage.module.scss';

type AlbumsProps = {
  albums: Album[];
};

export default function AlbumsPage({ albums }: AlbumsProps) {
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
  const albumResponse: Album[] = await fetch(`${CONFIG.baseUrl}/api/v1/albums`)
    .then((res) => res.json())
    .catch((err) => err.json());
  const albums = albumResponse.map((album) => ({ ...album }));

  return {
    props: {
      albums,
    },
  };
};
