import axios from "axios";

export default class ApiClient {
  constructor(options) {
    this.instance = axios.create(options);
  }

  defaultHeaders() {
    return { Authorization: `Bearer ${MAPPY_API_KEY}` };
  }

  getAlbums() {
    return this.instance.get(`${MAPPY_API_HOST}/api/albums`, {
      headers: this.defaultHeaders()
    });
  }

  getAlbum(album_id) {
    return axios.get(`${MAPPY_API_HOST}/api/album/${album_id}`, {
      headers: this.defaultHeaders()
    });
  }

  thumbnailUrl(album_id, image_name) {
    return `${MAPPY_API_HOST}/serve/thumb/album/${album_id}/image/${image_name}`;
  }

  imageUrl(album_id, image_name) {
    return `${MAPPY_API_HOST}/serve/full/album/${album_id}/image/${image_name}`;
  }
}
