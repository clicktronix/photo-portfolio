import { PureComponent } from 'react';
import { GetStaticProps } from 'next';
import cn from 'classnames';

import { CONFIG } from 'core/config';
import { generatorFromArr } from 'helpers/generatorFromArr';
import { Photo, PhotoResponse } from 'models/photo';
import { Layout } from 'components/Layout/Layout';

import styles from './Main.module.scss';

type MainProps = {
  photos: Photo[];
};

type State = {
  isLoading: boolean;
  currentPhoto: IteratorResult<Photo | undefined>;
};

export default class Main extends PureComponent<MainProps, State> {
  public state: State = {
    isLoading: false,
    currentPhoto: undefined,
  };

  private gen = generatorFromArr(this.props.photos);

  public componentDidMount() {
    this.nextPhoto();
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

  private onLoadEnd = () => {
    this.setState({ isLoading: false });
  };

  private onLoad = () => {
    setTimeout(this.nextPhoto, 5000);
    setTimeout(this.onLoadEnd, 100);
  };

  public render() {
    const { currentPhoto, isLoading } = this.state;

    return (
      <Layout withFooter={false} withHeader={false}>
        <div className={styles.Container}>
          {currentPhoto?.value && (
            <img
              className={cn(styles.Photo, {
                [styles.ImageVisible]: !isLoading,
                [styles.ImageHidden]: isLoading,
              })}
              src={currentPhoto.value.src}
              onLoad={this.onLoad}
              alt="banner"
            />
          )}
        </div>
      </Layout>
    );
  }
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  const data: PhotoResponse[] = await fetch(`${CONFIG.baseUrl}/api/v1/photos/main-screen`)
    .then((res) => res.json())
    .catch((err) => err.json());
  const photos = data
    .filter((x) => Boolean(x.is_grid))
    .map((x) => ({
      width: x.width,
      height: x.height,
      src: x.img,
    }));

  return {
    props: {
      photos,
    },
  };
};
