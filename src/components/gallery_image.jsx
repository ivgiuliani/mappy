import React, { Component } from "react";

class GalleryImage extends Component {
  render() {
    return (
      <img className="gallery-image" width="200px" src={this.thumbnailUrl()} />
    );
  }

  thumbnailUrl() {
    return (
      MAPPY_API_HOST +
      "/serve/thumb/album/" +
      this.props.album_id +
      "/image/" +
      this.props.image_id
    );
  }
}

export default GalleryImage;
