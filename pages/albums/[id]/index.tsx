import { GetServerSidePropsContext, GetStaticProps } from 'next';

import { CONFIG } from 'core/config';
import { Album, AlbumResponse } from 'models/album';
import { Layout } from 'components/Layout/Layout';
import { Grid } from 'components/Grid/Grid';

type AlbumProps = Album;

export default function AlbumPage({ photos }: AlbumProps) {
  return <Layout withFooter={false}>{photos && <Grid photos={photos} />}</Layout>;
}

export async function getStaticPaths() {
  const albumsResponse: AlbumResponse[] = await fetch(`${CONFIG.baseUrl}/api/v1/albums`)
    .then((res) => res.json())
    .catch((err) => err.json());

  const paths = albumsResponse.map((a) => ({
    params: { id: a.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<AlbumProps> = async ({ params }: GetServerSidePropsContext) => {
  const { id } = params;
  const albumResponse: AlbumResponse = await fetch(`${CONFIG.baseUrl}/api/v1/albums/${id}`)
    .then((res) => res.json())
    .catch((err) => err.json());

  return {
    props: albumResponse,
  };
};
