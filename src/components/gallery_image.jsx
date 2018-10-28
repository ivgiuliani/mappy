import React, { Component } from "react";

class GalleryImage extends Component {
  state = {
    album_id: null,
    image_id: null
  };

  render() {
    return (
      <img
        className="gallery-image"
        width="200px"
        src={
          "http://localhost:5000/serve/thumb/album/" +
          this.state.album_id +
          "/image/" +
          this.state.image_id
        }
      />
    );
  }
}

export default GalleryImage;
