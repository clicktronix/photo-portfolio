import { Photo } from 'models/photo';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './LightBox.module.scss';
import { CloseButton } from 'components/CloseButton/CloseButton';

type LightBoxProps = {
  currentPhoto: Photo;
  photos: Photo[];
  isShow?: boolean;
  onClose?: () => void;
};

const ESCAPE_KEY = 'Escape';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_LEFT_KEY = 'ArrowLeft';

export function LightBox({ isShow = false, currentPhoto, photos, onClose }: LightBoxProps) {
  const [photoToShow, setPhotoToShow] = useState<Photo | undefined>(photos.find((x) => x.src === currentPhoto.src));
  const [lightBoxDisplay, setLightBoxDisplay] = useState(isShow);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowControls, setIsShowControls] = useState(false);
  const mouseMoveTimeOut = useRef<NodeJS.Timeout>();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    hideControls();
    switch (event.key) {
      case ESCAPE_KEY:
        onHideLightBox();
        break;
      case ARROW_RIGHT_KEY:
        onShowNext();
        break;
      case ARROW_LEFT_KEY:
        onShowPrev();
        break;
      default:
        break;
    }
  };

  const handleMouseMove = () => {
    clearTimeout(mouseMoveTimeOut.current);
    showControls();
    mouseMoveTimeOut.current = setTimeout(hideControls, 1500);
  };

  const hideControls = () => {
    setIsShowControls(false);
  };

  const showControls = () => {
    setIsShowControls(true);
  };

  const onHideLightBox = () => {
    setLightBoxDisplay(false);
    onClose();
  };

  const onPhotoLoad = () => {
    setIsLoading(false);
  };

  const onShowNext = () => {
    const currentIndex = photos.indexOf(photoToShow);
    if (currentIndex >= photos.length - 1) {
      setPhotoToShow(photos[0]);
    } else {
      const nextImage = photos[currentIndex + 1];
      setPhotoToShow(nextImage);
    }
  };

  const onShowPrev = () => {
    const currentIndex = photos.indexOf(photoToShow);
    if (currentIndex <= 0) {
      setPhotoToShow(photos[0]);
    } else {
      const nextImage = photos[currentIndex - 1];
      setPhotoToShow(nextImage);
    }
  };

  console.log(isShow, lightBoxDisplay);

  return (
    <div
      className={cn(styles.LightBox, {
        [styles.IsHide]: !lightBoxDisplay,
      })}
    >
      <div className={styles.Wrapper}>
        {isShowControls && (
          <>
            <CloseButton tabIndex={-2} classes={styles.HideButton} onClick={onHideLightBox} />
            <span role="button" tabIndex={0} className={styles.PrevButton} onClick={onShowPrev} />
          </>
        )}
        <img
          className={cn(styles.Photo, {
            [styles.IsPhotoLoading]: isLoading,
          })}
          alt={photoToShow.src}
          src={photoToShow.src}
          onLoad={onPhotoLoad}
        />
        {isShowControls && <span role="button" tabIndex={-1} className={styles.NextButton} onClick={onShowNext} />}
      </div>
    </div>
  );
}
