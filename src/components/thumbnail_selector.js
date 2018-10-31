import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import LazyLoad from "react-lazyload";

export default class ThumbnailSelector extends React.Component {
  render() {
    return (
      <div className="m-3 text-center">
        <a
          href="#"
          onClick={() => this.props.onImageSelected(this.props.image)}
        >
          <div className="border-dark rounded p-1 image-shade d-inline-block">
            <LazyLoad height={200} offset={600} overflow>
              <img
                className="gallery-image border border-dark rounded text-center"
                style={{ display: "inline" }}
                width="170px"
                src={this.thumbnailUrl()}
              />
            </LazyLoad>
          </div>
        </a>
      </div>
    );
  }

  thumbnailUrl() {
    return `${MAPPY_API_HOST}/serve/thumb/album/${this.props.album_id}/image/${
      this.props.image.name
    }`;
  }
}
