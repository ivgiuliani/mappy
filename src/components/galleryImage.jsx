import React, { Component } from "react";

class GalleryImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album_id: null,
      image_id: null
    };
  }

  render() {
    return (
      <img
        className="gallery-image"
        width="200px"
        src={
          "http://localhost:5000/serve/thumb/album/" +
          this.props.album_id +
          "/image/" +
          this.props.image_id
        }
      />
    );
  }
}

export default GalleryImage;
