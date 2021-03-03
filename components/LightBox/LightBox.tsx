import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Photo } from 'models/photo';
import { CloseButton } from 'components/CloseButton/CloseButton';

import styles from './LightBox.module.scss';

type LightBoxProps = {
  currentPhoto: Photo;
  photos: Photo[];
  isShow?: boolean;
  onClose?: () => void;
};

const ESCAPE_KEY = 'Escape';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_LEFT_KEY = 'ArrowLeft';

export const LightBox = React.memo(({ isShow = false, currentPhoto, photos, onClose }: LightBoxProps) => {
  const [photoToShow, setPhotoToShow] = useState<Photo>(currentPhoto);
  const [isLightBoxShow, setIsLightBoxShow] = useState(isShow);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowControls, setIsShowControls] = useState(false);
  const mouseMoveTimeOut = useRef<NodeJS.Timeout>();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseMoveTimeOut.current);
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    hideControls();
    switch (event.key) {
      case ESCAPE_KEY:
        hideLightBox();
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

  const hideLightBox = () => {
    setIsLightBoxShow(false);
    onClose();
  };

  const onPhotoLoad = () => {
    setIsLoading(false);
  };

  const onShowNext = () => {
    const currentIndex = photos.indexOf(photoToShow);
    currentIndex >= photos.length - 1 ? setPhotoToShow(photos[0]) : setPhotoToShow(photos[currentIndex + 1]);
  };

  const onShowPrev = () => {
    const currentIndex = photos.indexOf(photoToShow);
    currentIndex <= 0 ? setPhotoToShow(photos[0]) : setPhotoToShow(photos[currentIndex - 1]);
  };

  return (
    <div
      className={cn(styles.LightBox, {
        [styles.IsHide]: !isLightBoxShow,
      })}
    >
      <div className={styles.Wrapper}>
        {isShowControls && (
          <>
            <CloseButton tabIndex={-2} classes={styles.HideButton} onClick={hideLightBox} />
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
});

LightBox.displayName = 'LightBox';
