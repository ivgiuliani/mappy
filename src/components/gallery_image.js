import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

export default class GalleryImage extends React.Component {
  render() {
    return (
      <div className="m-3 text-center">
        <a
          href="#"
          onClick={() => this.props.onImageSelected(this.props.image)}
        >
          <div className="border-dark rounded p-1 image-shade d-inline-block">
            <img
              className="gallery-image border border-dark rounded text-center"
              style={{ display: "inline" }}
              width="170px"
              src={this.thumbnailUrl()}
            />
          </div>
        </a>
      </div>
    );
  }

  mapsUrl() {
    const { lat, lng } = this.props.image;
    return "http://www.google.com/maps/?q=" + lat + "," + lng;
  }

  thumbnailUrl() {
    return `${MAPPY_API_HOST}/serve/thumb/album/${this.props.album_id}/image/${
      this.props.image.name
    }`;
  }
}
