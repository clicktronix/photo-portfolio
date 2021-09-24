import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Photo } from 'models/photo';
import { useIdleTimeOut } from 'shared/hooks/useIdleTimeout';

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

const HIDE_TIME = 1500;
const ESCAPE_KEY = 'Escape';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_LEFT_KEY = 'ArrowLeft';

export const LightBox = ({ isShow = false, currentPhoto, photos, onClose }: LightBoxProps) => {
  const [photoToShow, setPhotoToShow] = useState<Photo>(currentPhoto);
  const [isLightBoxShow, setIsLightBoxShow] = useState(isShow);
  const [isShowControls, setIsShowControls] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    hideControls();
    switch (event.key) {
      case ESCAPE_KEY:
        onCloseLightBox();
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

  const hideControls = useCallback(() => {
    setIsShowControls(false);
  }, []);

  const showControls = useCallback(() => {
    setIsShowControls(true);
  }, []);

  const onCloseLightBox = useCallback(() => {
    setIsLightBoxShow(false);
    onClose && onClose();
  }, []);

  const onPhotoLoad = () => {
    if (ref && ref.current) {
      ref.current.src = photoToShow.src;
    }
  };

  const onNextClickHandler = () => {
    const currentIndex = photos.indexOf(photoToShow);
    currentIndex >= photos.length - 1 ? setPhotoToShow(photos[0]) : setPhotoToShow(photos[currentIndex + 1]);
  };

  const onPrevClickHandler = () => {
    const currentIndex = photos.indexOf(photoToShow);
    currentIndex <= 0 ? setPhotoToShow(photos[0]) : setPhotoToShow(photos[currentIndex - 1]);
  };

  useIdleTimeOut(HIDE_TIME, hideControls, showControls);

  return (
    <div
      className={cn(styles.LightBox, {
        [styles.IsHide]: !isLightBoxShow,
      })}
    >
      <div className={styles.Wrapper}>
        {
          <img
            className={cn(styles.Photo)}
            ref={ref}
            alt={photoToShow.src}
            src={photoToShow.src}
            onLoad={onPhotoLoad}
          />
        }
        {isShowControls && (
          <>
            <CloseButton tabIndex={-2} classes={styles.HideButton} onClick={onCloseLightBox} />
            <PrevButton onClick={onPrevClickHandler} />
            <NextButton onClick={onNextClickHandler} />
          </>
        )}
      </div>
    </div>
  );
};

LightBox.displayName = 'LightBox';
