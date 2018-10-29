import React from "react";

class FullImage extends React.Component {
  render() {
    return (
      <div className="border border-dark p-2 rounded image-shade">
        <img
          width="100%"
          src={this.props.imageUrl}
          style={{ display: "block" }}
        />
      </div>
    );
  }
}

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
      return (
        <React.Fragment>
          <FullImage imageUrl={this.imageUrl()} />
          <p className="text-muted">
            <a href={this.mapsUrl()}>Map</a>
          </p>
        </React.Fragment>
      );
    }

    return <React.Fragment />;
  }

  imageUrl() {
    return `${MAPPY_API_HOST}/serve/full/album/${this.props.album_id}/image/${
      this.props.image.name
    }`;
  }

  mapsUrl() {
    const { lat, lng } = this.props.image;
    return "http://www.google.com/maps/?q=" + lat + "," + lng;
  }
}
