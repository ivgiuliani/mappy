import React from "react";

import "../resources/horiz_loader.css";

export default class HorizLoader extends React.Component {
  render() {
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
