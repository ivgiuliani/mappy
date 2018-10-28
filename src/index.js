import React from "react";
import ReactDOM from "react-dom";

import GalleryScroll from "./components/gallery_scroll";

class MapPane extends React.Component {
  render() {
    return (
      <div id="map-pane">
        <h6>map</h6>
      </div>
    );
  }
}

class Application extends React.Component {
  render() {
    return (
      <div id="application">
        <GalleryScroll />
        <MapPane />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("root"));
