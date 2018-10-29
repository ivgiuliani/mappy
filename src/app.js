import "./app.css";

import React from "react";

import { hot } from "react-hot-loader";

import GalleryScroll from "./components/gallery_scroll";
import MapPane from "./components/map_pane";
import ImagePane from "./components/image_pane";

class Application extends React.Component {
  state = {
    image: null,
    album_id: "washington2018"
  };

  handleImageSelection = image => {
    this.setState({ image });
  };

  render() {
    return (
      <div
        className="container-fluid p-0 fill-height d-flex flex-column no-gutters"
        id="application"
      >
        <div className="row h-100 d-flex no-gutters">
          <GalleryScroll
            album_id={this.state.album_id}
            onImageSelected={image => this.handleImageSelection(image)}
          />
          <ImagePane album_id={this.state.album_id} image={this.state.image} />
          <MapPane image={this.state.image} />
        </div>
      </div>
    );
  }
}

export default hot(module)(Application);
