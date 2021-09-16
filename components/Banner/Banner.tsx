import { PureComponent } from 'react';
import cn from 'classnames';

import { generatorFromArr } from 'shared/helpers/generatorFromArr';
import { Photo } from 'models/photo';

import styles from './Banner.module.scss';

type BannerProps = {
  photos: Photo[];
};

type State = {
  isLoading: boolean;
  timeoutIds: NodeJS.Timeout[];
  currentPhoto: IteratorResult<Photo> | undefined;
};

export class Banner extends PureComponent<BannerProps> {
  public state: State = {
    isLoading: false,
    timeoutIds: [],
    currentPhoto: undefined,
  };

  private gen = generatorFromArr(this.props.photos);

  public componentDidMount() {
    this.nextPhoto();
  }

  public componentWillUnmount() {
    this.clearTimeouts();
  }

  private nextPhoto = () => {
    this.setState({ isLoading: true });
    const iter = this.gen.next();
    if (iter?.done) {
      this.gen = generatorFromArr(this.props.photos);
      this.setState({ currentPhoto: this.gen.next() });
    } else {
      this.setState({ currentPhoto: iter });
    }
  };

  private onPhotoLoadEnd = () => {
    this.setState({ isLoading: false });
  };

  private onLoad = () => {
    const nextPhotoTimeoutId = setTimeout(this.nextPhoto, 5000);
    const onPhotoLoadEndTimeoutId = setTimeout(this.onPhotoLoadEnd, 100);
    this.setState({ timeoutIds: [nextPhotoTimeoutId, onPhotoLoadEndTimeoutId] });
  };

  private onPhotoClick = () => {
    this.clearTimeouts();
    this.nextPhoto();
  };

  private clearTimeouts = () => {
    this.state.timeoutIds.forEach((x) => clearTimeout(x));
  };

  render() {
    const { currentPhoto, isLoading } = this.state;

    return (
      <div className={styles.Container}>
        {currentPhoto?.value && (
          <img
            className={cn(styles.Photo, {
              [styles.ImageVisible]: !isLoading,
              [styles.ImageHidden]: isLoading,
            })}
            src={currentPhoto.value.src}
            onClick={this.onPhotoClick}
            onLoad={this.onLoad}
            alt="banner"
          />
        )}
      </div>
    );
  }
}
