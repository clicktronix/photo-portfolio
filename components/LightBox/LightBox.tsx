import { Photo } from 'models/photo';
import React, { useState } from 'react';
import cn from 'classnames';

import styles from './LightBox.module.scss';

type LightBoxProps = {
  currentPhoto: Photo;
  photos: Photo[];
  isShow?: boolean;
};

export function LightBox({ isShow, currentPhoto, photos }: LightBoxProps) {
  const [photoToShow, setPhotoToShow] = useState<Photo | undefined>(
    photos.find((x) => x.src === currentPhoto.src),
  );
  const [lightBoxDisplay, setLightBoxDisplay] = useState(isShow);

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const showNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const currentIndex = photos.indexOf(photoToShow);
    if (currentIndex >= photos.length - 1) {
      setPhotoToShow(photos[0]);
    } else {
      const nextImage = photos[currentIndex + 1];
      setPhotoToShow(nextImage);
    }
  };

  const showPrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const currentIndex = photos.indexOf(photoToShow);
    if (currentIndex <= 0) {
      setPhotoToShow(photos[0]);
    } else {
      const nextImage = photos[currentIndex - 1];
      setPhotoToShow(nextImage);
    }
  };

  return (
    <div
      className={cn(styles.LightBox, {
        [styles.IsHide]: !lightBoxDisplay,
      })}
    >
      <button className={styles.HideButton} onClick={hideLightBox}>
        x
      </button>
      <button className={styles.PrevButton} onClick={showPrev}>
        ⭠
      </button>
      <img className={styles.Photo} alt={photoToShow.src} src={photoToShow.src}></img>
      <button className={styles.NextButton} onClick={showNext}>
        ⭢
      </button>
    </div>
  );
}
