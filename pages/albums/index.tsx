import { GetStaticProps } from 'next';
import { AlbumComponent } from 'components/Album/Album';
import { CONFIG } from 'core/config';
import { Album } from 'models/album';
import { Layout } from 'components/Layout/Layout';

type AlbumProps = {
  albums: Album[];
};

export default function Albums({ albums }: AlbumProps) {
  return (
    <Layout withFooter={true}>
      {albums.map((x) => (
        <AlbumComponent name={x.name} description={x.description} key={x.name} />
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AlbumProps> = async () => {
  const albumResponse: Album[] = await fetch(`${CONFIG.baseUrl}/api/v1/albums`)
    .then((res) => res.json())
    .catch((err) => err.json());
  const mainScreenPhotos = albumResponse.map((x) => ({
    name: x.name,
    description: x.description,
  }));

  return {
    props: {
      albums: mainScreenPhotos,
    },
  };
};
