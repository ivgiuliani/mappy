import React, { Component } from "react";
import axios from "axios";

import GalleryImage from "./gallery_image";

export default class GalleryScroll extends Component {
  state = {
    album_name: "Washington 2018",
    album_id: "washington2018",
    images: []
  };

  componentDidMount() {
    axios
      .get(MAPPY_API_HOST + "/api/album/" + this.state.album_id)
      .then(response => {
        const data = response.data;

        this.setState({
          album_id: data.aid,
          album_name: data.name,
          images: data.images
        });
      });
  }

  render() {
    return (
      <div id="gallery-scroll" className="col-2 h-100">
        {this.imagesList()}
      </div>
    );
  }

  imagesList() {
    return this.state.images.map(img => (
      <GalleryImage
        album_id={this.state.album_id}
        image_id={img.name}
        lat={img.lat}
        lng={img.lng}
        key={img.name}
      />
    ));
  }
}
