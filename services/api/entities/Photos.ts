import { autobind } from 'core-decorators';
import { convertServerPhoto } from '../converters/photos';

import { PhotoResponse } from '../types/models/photo';

import { BaseApi } from './BaseApi';

class Photos extends BaseApi {
  @autobind
  public async getPhoto(id: number) {
    const response = await this.actions.get<PhotoResponse>({
      url: `/photos/${id}`,
    });

    return convertServerPhoto(response.data);
  }

  @autobind
  public async getPhotos() {
    const response = await this.actions.get<PhotoResponse[]>({
      url: '/photos',
    });

    return response.data.map(convertServerPhoto);
  }

  @autobind
  public async getMainScreenPhoto() {
    const response = await this.actions.get<PhotoResponse[]>({
      url: `/photos/main-screen`,
    });

    return response.data.map(convertServerPhoto);
  }

  @autobind
  public async getGridPhoto() {
    const response = await this.actions.get<PhotoResponse[]>({
      url: `/photos/grid`,
    });

    return response.data.map(convertServerPhoto);
  }
}

export { Photos };
