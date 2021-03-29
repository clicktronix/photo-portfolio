import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { Photo } from 'models/photo';

import { CloseButton } from '../CloseButton/CloseButton';
import { PrevButton } from './PrevButton/PrevButton';
import { NextButton } from './NextButton/NextButton';

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
      mouseMoveTimeOut.current && clearTimeout(mouseMoveTimeOut.current);
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    hideControls();
    switch (event.key) {
      case ESCAPE_KEY:
        hideLightBox();
        break;
      case ARROW_RIGHT_KEY:
        onNextClickHandler();
        break;
      case ARROW_LEFT_KEY:
        onPrevClickHandler();
        break;
      default:
        break;
    }
  };

  const handleMouseMove = () => {
    mouseMoveTimeOut.current && clearTimeout(mouseMoveTimeOut.current);
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
    onClose && onClose();
  };

  const onPhotoLoad = () => {
    setIsLoading(false);
  };

  const onNextClickHandler = () => {
    const currentIndex = photos.indexOf(photoToShow);
    currentIndex >= photos.length - 1 ? setPhotoToShow(photos[0]) : setPhotoToShow(photos[currentIndex + 1]);
  };

  const onPrevClickHandler = () => {
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
        <Image
          className={cn(styles.Photo, {
            [styles.IsPhotoLoading]: isLoading,
          })}
          alt={photoToShow.src}
          src={photoToShow.src}
          onLoad={onPhotoLoad}
          width={photoToShow.width}
          height={photoToShow.height}
        />
        {isShowControls && (
          <>
            <CloseButton tabIndex={-2} classes={styles.HideButton} onClick={hideLightBox} />
            <PrevButton onClick={onPrevClickHandler} />
            <NextButton onClick={onNextClickHandler} />
          </>
        )}
      </div>
    </div>
  );
});

LightBox.displayName = 'LightBox';
