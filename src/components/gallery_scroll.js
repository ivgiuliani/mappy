import React, { Component } from "react";

import ThumbnailSelector from "./thumbnail_selector";

export default class GalleryScroll extends Component {
  render() {
    return (
      <div id="gallery-scroll" className="col-2 h-100">
        {this.imagesList()}
      </div>
    );
  }

  imagesList() {
    return this.props.images.map(img => (
      <ThumbnailSelector
        album_id={this.props.album_id}
        image={img}
        key={img.name}
        onImageSelected={image => this.props.onImageSelected(image)}
      />
    ));
  }
}
