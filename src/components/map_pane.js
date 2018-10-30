import React from "react";
import Map from "pigeon-maps";

import markerNormal from "../images/marker.png";
import markerSelected from "../images/marker_selected.png";

class ImageMarker extends React.Component {
  baseStyle = {
    position: "absolute",
    borderBottomLeftRadius: "100%",
    borderBottomRightRadius: "100%",
    borderTopLeftRadius: "100%",
    borderTopRightRadius: "100%"
  };

  render() {
    const { left, top } = this.props;

    let color = "#3b72b1";
    let size = 5;
    if (this.props.selected) {
      color = "#C00000";
      size = 15;
    }

    const style = {
      ...this.baseStyle,
      transform: `translate(${left - size}px, ${top - size}px)`,
      cursor: "pointer",
      background: color,
      width: size,
      height: size
    };

    return <div style={style}>{/* <img src={markerNormal} /> */}</div>;
  }
}

export default class MapPane extends React.Component {
  position(image) {
    let lat = 0;
    let lng = 0;
    if (image) {
      lat = image.lat;
      lng = image.lng;
    }

    return [lat, lng];
  }

  render() {
    const currentImage = this.props.current_image;
    const centerPosition = this.position(currentImage);

    return (
      <div id="map-pane" className="h-100 col-4">
        <Map
          center={centerPosition}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
          animate={true}
          limitBounds="edge"
        >
          {this.renderMarkers()}
        </Map>
      </div>
    );
  }

  renderMarkers() {
    return this.props.all_images.map(image => {
      return (
        <ImageMarker
          key={image.name}
          anchor={this.position(image)}
          selected={this.props.current_image == image}
        />
      );
    });
  }
}
