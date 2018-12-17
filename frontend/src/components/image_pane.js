import React from "react";

class FullImage extends React.Component {
  state = {
    loading: true
  };

  onLoad = event => {
    console.log("over");
    this.setState({ loading: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUrl !== this.props.imageUrl) {
      this.setState({ loading: true });
    }
  }

  render() {
    const isLoading = this.state.loading;
    let loader = "";
    if (isLoading) {
      loader = <div className="loading-spinner loading-spinner-full-image" />;
    }

    return (
      <div className="border border-light p-2 m-1 rounded image-shade img-container d-inline-block">
        {loader}
        <img
          src={this.props.imageUrl}
          onLoad={this.onLoad}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    );
  }
}

class SelectToStart extends React.Component {
  render() {
    return (
      <div className="text-center p-5">
        <p className="lead" style={{ color: "#c0c090" }}>
          Select an image to start
        </p>
      </div>
    );
  }
}

class ImageDetails extends React.Component {
  render() {
    return (
      <div className="text-muted d-flex flex-row justify-content-between p-2 m-1 rounded image-shade">
        <small>{this.props.image.date_time}</small>
        <small>
          lat: {this.props.image.lat} lon: {this.props.image.lng}
          {this.props.image.estimated_location && (
            <React.Fragment>
              <br /> <i>Location is estimated</i>
            </React.Fragment>
          )}
        </small>
      </div>
    );
  }
}

export default class ImagePane extends React.Component {
  render() {
    return (
      <div id="image-pane" className="p-1 h-100 col-6">
        {!this.props.image && <SelectToStart />}
        {this.imageComponent()}
      </div>
    );
  }

  imageComponent() {
    if (this.props.image) {
      return (
        <React.Fragment>
          <FullImage imageUrl={this.imageUrl()} />
          <ImageDetails image={this.props.image} />
        </React.Fragment>
      );
    }

    return <React.Fragment />;
  }

  imageUrl() {
    return `${MAPPY_API_HOST}/serve/full/album/${this.props.album_id}/image/${
      this.props.image.name
    }`;
  }
}
