import React from "react";
import Map from "pigeon-maps";

class MapMarker extends React.Component {
  baseStyle = {
    position: "absolute",
    borderBottomLeftRadius: "100%",
    borderBottomRightRadius: "100%",
    borderTopLeftRadius: "100%",
    borderTopRightRadius: "100%",
    background: "#3b72b1",
    width: 15,
    height: 15
  };

  render() {
    const { left, top } = this.props;

    const style = {
      ...this.baseStyle,
      transform: `translate(${left - 15}px, ${top - 15}px)`,
      cursor: "pointer"
    };

    return <div style={style} />;
  }
}

export default class MapPane extends React.Component {
  position() {
    const image = this.props.image;
    let lat = 0;
    let lng = 0;
    if (image) {
      lat = image.lat;
      lng = image.lng;
    }

    return [lat, lng];
  }

  render() {
    const p = this.position();

    return (
      <div id="map-pane" className="h-100 col-4">
        <Map
          center={p}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
          animate={true}
          limitBounds="edge"
        >
          <MapMarker anchor={p} />
        </Map>
      </div>
    );
  }
}
