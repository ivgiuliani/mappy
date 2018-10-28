import "./app.css";

import React from "react";

import { hot } from "react-hot-loader";

import GalleryScroll from "./components/gallery_scroll";
import MapPane from "./components/map_pane";
import { hidden } from "ansi-colors";

class Application extends React.Component {
  appStyle = {
    overflow: hidden,
    minHeight: "100%"
  };

  render() {
    return (
      <div
        className="container-fluid p-0 fill-height d-flex flex-column no-gutters"
        style={this.appStyle}
        id="application"
      >
        <div className="row h-100 d-flex no-gutters">
          <GalleryScroll album_id="washington2018" />
          <MapPane />
        </div>
      </div>
    );
  }
}

export default hot(module)(Application);
