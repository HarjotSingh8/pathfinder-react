import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
class Header extends Component {
  render() {
    return (
      <div
        className="header ml-0 row bg-dark text-white justify-content-center justify-content-sm-start"
        style={{ width: "100%" }}
      >
        <div className="row col-12 col-sm-3 justify-content-center justify-content-sm-start">
          <div className="ml-0 ml-sm-3 d-inline-flex">
            <b>PATHFINDER</b>
          </div>
        </div>
        <div class="row col-4 col-sm-3">
          <button
            class="btn btn-dark"
            onclick={this.props.dijkstra}
            style={{ height: "24px" }}
          >
            dijkstra
          </button>
        </div>
        <div className="row col-sm-12 col-md-6 justify-content-sm-center justify-content-md-end">
          <div className="row col-6">
            <div className="col-3">rows</div>
            <div className="col-9 mt-1" style={{ overflow: "hidden" }}>
              <InputRange
                maxValue={50}
                minValue={15}
                value={this.props.rows}
                onChange={value => {
                  this.props.updaterows(value);
                  this.setState({ rows: value });
                }}
              />
            </div>
          </div>
          <div className="row col-6">
            <div className="col-3">cols</div>
            <div className="col-9 mt-1" style={{ overflow: "hidden" }}>
              <InputRange
                maxValue={50}
                minValue={15}
                value={this.props.cols}
                onChange={value => {
                  this.props.updatecols(value);
                  this.setState({ cols: value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
