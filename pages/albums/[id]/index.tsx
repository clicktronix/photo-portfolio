import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';

import { CONFIG } from 'core/config';
import { Album, AlbumResponse } from 'models/album';
import { Layout } from 'components/Layout/Layout';
import { Grid } from 'components/Grid/Grid';

type AlbumProps = {
  album?: Album;
  error?: string;
};

export default function AlbumPage(props: AlbumProps) {
  const { album, error } = props;

  return <Layout withFooter={false}>{<Grid photos={album ? album.photos : []} />}</Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps: GetStaticProps<AlbumProps> = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    return {
      props: {
        error: 'There is no params at the url',
      },
    };
  }
  const { id } = params;
  const albumResponse: AlbumResponse = await fetch(`${CONFIG.baseUrl}/api/v1/albums/${id}`)
    .then((res) => res.json())
    .catch((err) => err.json());

  return {
    props: {
      album: albumResponse,
    },
  };
};
