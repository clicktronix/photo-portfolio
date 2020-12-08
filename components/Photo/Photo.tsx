import { Photo } from 'models/photo';

type PhotoProps = {
  photo: Photo;
  onLoad: () => void;
};

export const PhotoComponent = ({ photo, onLoad }: PhotoProps) => {
  return <img alt={photo.src} {...photo} onLoad={onLoad} />;
};
