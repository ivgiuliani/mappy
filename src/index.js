import React from 'react';
import ReactDOM from 'react-dom';


class GalleryImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album_id: null,
      image_id: null,
    }
  }

  render() {
    return (
      <img className="gallery-image" src={this.props.image_id} />
    )
  }
}


class GalleryScroll extends React.Component {
  render() {
    return (
      <div id="gallery-scroll">
        <GalleryImage album_id="washington2018" image_id="IMG_20181022_181528.jpg" />
        <GalleryImage album_id="washington2018" image_id="IMG_20181023_094506.jpg" />
        <GalleryImage album_id="washington2018" image_id="IMG_20181023_104248.jpg" />
      </div>
    )
  }
}


class MapPane extends React.Component {
  render() {
    return (
      <div id="map-pane">
        <h6>map</h6>
      </div>
    )
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

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
