import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";

import GalleryScroll from "./components/gallery_scroll";
import MapPane from "./components/map_pane";

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
