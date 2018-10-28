import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

class GalleryImage extends React.Component {
  render() {
    return (
      <div className="m-3">
        <img
          className="gallery-image border border-dark rounded"
          width="170px"
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
