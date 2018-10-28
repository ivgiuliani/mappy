import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

class GalleryImage extends React.Component {
  render() {
    return (
      <div className="m-2">
        <img
          className="gallery-image"
          width="160px"
          src={this.thumbnailUrl()}
        />
      </div>
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
