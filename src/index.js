import React from "react";
import ReactDOM from "react-dom";

import GalleryImage from "./components/galleryImage";

class GalleryScroll extends React.Component {
  render() {
    return (
      <div id="gallery-scroll">
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181022_181528.jpg"
        />
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181023_094506.jpg"
        />
        <GalleryImage
          album_id="washington2018"
          image_id="IMG_20181023_104248.jpg"
        />
      </div>
    );
  }
}

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
