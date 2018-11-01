import "./resources/app.css";
import "./resources/bootstrap-darkly.min.css";

import React from "react";

import { hot } from "react-hot-loader";
import axios from "axios";
import GalleryScroll from "./components/gallery_scroll";
import MapPane from "./components/map_pane";
import ImagePane from "./components/image_pane";
import NavBar from "./components/navbar";

class Application extends React.Component {
  state = {
    images: [],
    album: {
      id: "",
      name: ""
    },
    current_image: null
  };

  handleImageSelection = image => {
    this.setState({ current_image: image });
  };

  handleMapMarkerSelection = image => {
    this.setState({ current_image: image });
  };

  handleAlbumSelection = album => {
    this.setState({ album: album });

    const aid = album.id;
    axios.get(`${MAPPY_API_HOST}/api/album/${aid}`).then(response => {
      const data = response.data;

      this.setState({
        images: data.images,
        current_image: null
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar onAlbumSelected={album => this.handleAlbumSelection(album)} />
        <div
          className="container-fluid p-0 fill-height d-flex flex-column no-gutters"
          id="application"
        >
          <div className="row h-100 d-flex no-gutters">
            <GalleryScroll
              album_id={this.state.album.id}
              images={this.state.images}
              onImageSelected={image => this.handleImageSelection(image)}
            />
            <ImagePane
              album_id={this.state.album.id}
              image={this.state.current_image}
            />
            <MapPane
              all_images={this.state.images}
              current_image={this.state.current_image}
              onMarkerSelected={image => this.handleMapMarkerSelection(image)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(Application);
