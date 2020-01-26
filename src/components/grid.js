import React, { Component } from "react";
import "react-input-range/lib/css/index.css";
import Node from "./node";
class Grid extends Component {
  render() {
    return (
      <div
        className="row  bg-white text-dark justify-content-center"
        style={{ height: "100%", width: "100%" }}
      >
        {this.props.grid}
      </div>
    );
  }
}
export default Grid;
