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
    album_name: "",
    album_id: "newyork2018",
    current_image: null
  };

  componentDidMount() {
    const aid = this.state.album_id;

    axios.get(`${MAPPY_API_HOST}/api/album/${aid}`).then(response => {
      const data = response.data;

      this.setState({
        album_id: data.aid,
        album_name: data.name,
        images: data.images,
        current_image: null
      });
    });
  }

  handleImageSelection = image => {
    this.setState({ current_image: image });
  };

  handleMapMarkerSelection = image => {
    this.setState({ current_image: image });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div
          className="container-fluid p-0 fill-height d-flex flex-column no-gutters"
          id="application"
        >
          <div className="row h-100 d-flex no-gutters">
            <GalleryScroll
              album_id={this.state.album_id}
              images={this.state.images}
              onImageSelected={image => this.handleImageSelection(image)}
            />
            <ImagePane
              album_id={this.state.album_id}
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
