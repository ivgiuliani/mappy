import "./resources/app.css";
import "./resources/bootstrap-darkly.min.css";

import React from "react";

import { hot } from "react-hot-loader";
import axios from "axios";
import GalleryScroll from "./components/gallery_scroll";
import MapPane from "./components/map_pane";
import ImagePane from "./components/image_pane";
import NavBar from "./components/navbar";
import ApiClient from "./api";

class Application extends React.Component {
  state = {
    images: [],
    album: {
      id: "",
      name: ""
    },
    isLoadingImage: false,
    current_image: null
  };

  handleImageSelection = image => {
    const isLoading = image != this.state.current_image;
    this.setState({ current_image: image, isLoadingImage: isLoading });
  };

  handleImageLoaded = () => {
    this.setState({ isLoadingImage: false });
  };

  handleMapMarkerSelection = image => {
    this.setState({ current_image: image, isLoadingImage: true });
  };

  findCurrentImageIdx() {
    return this.state.images.findIndex(
      el => el.name == this.state.current_image.name
    );
  }

  handleKeyDown = event => {
    let curr_idx;
    let next_idx;

    if (event.keyCode != 37 && event.keyCode != 39) {
      return;
    }

    if (this.state.current_image == null) {
      this.setState({ current_image: this.state.images[0] });
      return;
    }

    curr_idx = this.findCurrentImageIdx();
    if (curr_idx == -1) {
      return;
    }

    switch (event.keyCode) {
      case 39: // arrow right
        next_idx = Math.min(curr_idx + 1, this.state.images.length - 1);
        break;
      case 37: // arrow left
        next_idx = Math.max(curr_idx - 1, 0);
        break;
      default:
        break;
    }

    const isLoading = this.state.images[next_idx] != this.state.current_image;
    this.setState({
      current_image: this.state.images[next_idx],
      isLoadingImage: isLoading
    });
  };

  handleAlbumSelection = album => {
    this.setState({ album: album });

    const aid = album.id;
    new ApiClient().getAlbum(aid).then(response => {
      const data = response.data;

      this.setState({
        images: data.images,
        current_image: null
      });
    });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  render() {
    return (
      <div
        className="container-fluid p-0 fill-height d-flex flex-column no-gutters"
        id="application"
        onKeyDown={this.handleKeyPress}
      >
        <NavBar
          onAlbumSelected={album => this.handleAlbumSelection(album)}
          isLoadingImage={this.state.isLoadingImage}
        />
        <div className="row h-100 d-flex no-gutters">
          <GalleryScroll
            album_id={this.state.album.id}
            images={this.state.images}
            onImageSelected={image => this.handleImageSelection(image)}
          />
          <ImagePane
            album_id={this.state.album.id}
            image={this.state.current_image}
            onImageLoaded={() => this.handleImageLoaded()}
          />
          <MapPane
            all_images={this.state.images}
            current_image={this.state.current_image}
            onMarkerSelected={image => this.handleMapMarkerSelection(image)}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(Application);
