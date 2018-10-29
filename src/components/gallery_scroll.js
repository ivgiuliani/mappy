import React, { Component } from "react";
import axios from "axios";

import GalleryImage from "./gallery_image";

export default class GalleryScroll extends Component {
  state = {
    album_name: "",
    album_id: "",
    images: []
  };

  componentDidMount() {
    const aid = this.props.album_id;

    axios.get(`${MAPPY_API_HOST}/api/album/${aid}`).then(response => {
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
        image={img}
        key={img.name}
        onImageSelected={image => this.props.onImageSelected(image)}
      />
    ));
  }
}
