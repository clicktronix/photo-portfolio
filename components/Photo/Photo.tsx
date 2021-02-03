import { Photo } from 'models/photo';
import { RenderImageProps } from 'react-photo-gallery';

export type PhotoComponentProps = {
  onLoad: () => void;
} & RenderImageProps<Photo>;

export const PhotoComponent = ({ photo, index, margin, onClick, onLoad }: PhotoComponentProps) => {
  const onImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    onClick(e, { ...photo, index });
  };

  return (
    <img
      alt="grid"
      style={{ margin, height: photo.height, width: photo.width }}
      {...(photo as any)}
      onClick={onImageClick}
      onLoad={onLoad}
    />
  );
};
