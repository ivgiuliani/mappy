import React from "react";
import _ from "lodash";
import axios from "axios";

export default class NavBar extends React.Component {
  state = {
    albums: []
  };

  componentDidMount() {
    axios.get(`${MAPPY_API_HOST}/api/albums`).then(response => {
      const data = response.data;

      this.setState({
        albums: data
      });

      if (data.length > 0) {
        this.props.onAlbumSelected(data[0]);
      }
    });
  }

  handleOnChange = event => {
    const album_id = event.target.value;
    const album = _.find(this.state.albums, { id: album_id });
    this.props.onAlbumSelected(album);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <form className="form form-inline">
          <select className="custom-select" onChange={this.handleOnChange}>
            {this.renderAlbums()}
          </select>
        </form>
      </nav>
    );
  }

  renderAlbums() {
    return this.state.albums.map(album => {
      return (
        <option key={"album-" + album.id} value={album.id}>
          {album.name}
        </option>
      );
    });
  }
}