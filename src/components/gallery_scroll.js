import React, { Component } from "react";
import axios from "axios";
import GalleryImage from "./gallery_image";

export default class GalleryScroll extends Component {
  loadAlbum() {
    axios
      .get(MAPPY_API_HOST + "/api/album/washington2018")
      .then(response => console.log(response));
  }

  render() {
    return (
      <div
        id="gallery-scroll"
        onClick={this.loadAlbum()}
        className="col-2 h-100"
      >
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181022_181528.jpg"
        />
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181023_094506.jpg"
        />
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181023_104248.jpg"
        />
      </div>
    );
  }
}
