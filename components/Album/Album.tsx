import styles from './Album.module.scss';

type AlbumProps = {
  name: string;
  description: string;
};

export function AlbumComponent({ description }: AlbumProps) {
  return <div className={styles.Album}>{description}</div>;
}
