import React from "react";
import Map from "pigeon-maps";

class ImageMarker extends React.Component {
  baseStyle = {
    position: "absolute",
    borderBottomLeftRadius: "100%",
    borderBottomRightRadius: "100%",
    borderTopLeftRadius: "100%",
    borderTopRightRadius: "100%",
    borderColor: "#FFFFFF",
    borderWidth: "1px",
    borderStyle: "solid"
  };

  render() {
    const { left, top } = this.props;

    let color = "#3b72b1";
    let size = 8;
    let zIndex = 0;
    if (this.props.selected) {
      color = "#C00000";
      size = 14;
      zIndex = 1;
    }

    const style = {
      ...this.baseStyle,
      transform: `translate(${left - size / 2}px, ${top - size / 2}px)`,
      cursor: "pointer",
      background: color,
      width: size,
      height: size,
      zIndex: zIndex
    };

    return <div style={style} />;
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
          defaultZoom={15}
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
      if (image.has_geolocation) {
        return (
          <ImageMarker
            key={image.name}
            anchor={this.position(image)}
            selected={this.props.current_image == image}
          />
        );
      }
    });
  }
}
