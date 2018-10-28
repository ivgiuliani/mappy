import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

class GalleryImage extends React.Component {
  render() {
    return (
      <div className="m-3">
        <a href={this.mapsUrl()}>
          <img
            className="gallery-image border border-dark rounded"
            width="170px"
            src={this.thumbnailUrl()}
          />
        </a>
      </div>
    );
  }

  mapsUrl() {
    const lat = this.props.lat;
    const lng = this.props.lng;

    return "http://www.google.com/maps/?q=" + lat + "," + lng;
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
