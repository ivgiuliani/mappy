import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import LazyLoad from "react-lazyload";

import ApiClient from "../api";

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
            {!this.props.image.has_geolocation && (
              <div
                className="missing-geolocation"
                title="Missing geolocation data"
              />
            )}
            <LazyLoad height={200} offset={600} overflow>
              <img
                className={
                  "gallery-image border border-light rounded text-center "
                }
                style={{ display: "inline" }}
                width="170px"
                src={new ApiClient().thumbnailUrl(
                  this.props.album_id,
                  this.props.image.name
                )}
              />
            </LazyLoad>
          </div>
        </a>
      </div>
    );
  }
}
