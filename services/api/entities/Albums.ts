import { autobind } from 'core-decorators';
import { convertServerAlbum } from '../converters/albums';
import { AlbumResponse } from '../types/models/album';

import { BaseApi } from './BaseApi';

class Albums extends BaseApi {
  @autobind
  public async getAlbums() {
    const response = await this.actions.get<AlbumResponse[]>({
      url: '/albums',
    });

    return response.data.map(convertServerAlbum);
  }

  @autobind
  public async getAlbum(id: string) {
    const response = await this.actions.get<AlbumResponse>({
      url: `/albums/${id}`,
    });

    return convertServerAlbum(response.data);
  }
}

export { Albums };
