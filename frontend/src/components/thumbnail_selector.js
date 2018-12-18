import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import LazyLoad from "react-lazyload";

export default class ThumbnailSelector extends React.Component {
  render() {
    return (
      <div className="m-3 text-center">
        <a
          href="#"
          id={`img-${this.props.album_id}-${this.props.image.name}`}
          onClick={() => this.props.onImageSelected(this.props.image)}
        >
          <div className="border-light rounded p-1 image-shade d-inline-block">
            <LazyLoad height={200} offset={600} overflow>
              {!this.props.image.has_geolocation && (
                <div
                  className="missing-geolocation"
                  title="Missing geolocation data"
                />
              )}
              <img
                className={
                  "gallery-image border border-light rounded text-center "
                }
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
