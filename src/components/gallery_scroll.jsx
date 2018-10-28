import React, { Component } from "react";

import GalleryImage from "./gallery_image";

class GalleryScroll extends Component {
  render() {
    return (
      <div id="gallery-scroll">
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

export default GalleryScroll;