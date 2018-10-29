import React from "react";

export default class ImagePane extends React.Component {
  render() {
    return (
      <div id="image-pane" className="h-100 col-6">
        {!this.props.image && "<p>No image</p>"}
        {this.imageComponent()}
      </div>
    );
  }

  imageComponent() {
    if (this.props.image) {
      console.log(this.imageUrl());
      return <img width="100%" src={this.imageUrl()} />;
    }

    return <React.Fragment />;
  }

  imageUrl() {
    return `${MAPPY_API_HOST}/serve/full/album/${this.props.album_id}/image/${
      this.props.image.name
    }`;
  }
}
