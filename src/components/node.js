import React, { Component } from "react";
import "./node.css";
class Node extends Component {
  state = {
    class: "blank",
    row: null,
    col: null
  };
  constructor() {
    super();
    //console.log("constructor called");
  }
  /*
  mousedown = () => {
    this.props.handleMouseDown(this.state.row, this.state.col);
  };
  mouseenter = () => {
    console.log(this.state.isWall);
    this.props.handleMouseEnter(this.state.row, this.state.col);
    this.setState({ wall: true, color: "black" });
  };*/
  componentDidUpdate() {
    //console.log("updated");
    //console.log(this.state.class != "start");
    if (this.props.isStart == true && this.state.class !== "start")
      this.setState({ class: "start" });
    else if (this.props.isFinish == true && this.state.class != "finish")
      this.setState({ class: "finish" });
    else if (
      this.props.isVisited == true &&
      this.state.class != "visited" &&
      this.props.isStart == false &&
      this.props.isFinish == false
    )
      this.setState({ class: "visited" });
    else if (
      this.state.class != "start" &&
      this.state.class != "finish" &&
      this.state.class != "visited"
    ) {
      if (this.props.isWall == true && this.state.class != "wall")
        this.setState({ class: "wall" });
      if (this.props.isWall == false && this.state.class != "blank")
        this.setState({ class: "blank" });
    }
  }
  componentDidMount() {
    //console.log("mounted");
    if (this.props.isWall != this.state.isWall)
      this.setState({ isWall: this.props.isWall });
    //console.log(this.props.row);
    if (this.state.isWall == true) this.setState({ color: "black" });
    this.setState({ row: this.props.row, col: this.props.col });
  }
  render() {
    return (
      <div
        style={{
          height: 100 / this.props.rows + "vh",
          width: 100 / this.props.cols + "vw",
          padding: "0px",
          border: "solid",
          borderWidth: "0.5px",
          borderColor: "gray",
          backgroundColor: this.state.color,
          display: "inline-block"
        }}
        onMouseDown={() =>
          this.props.onMouseDown(this.state.row, this.state.col)
        }
        onMouseEnter={() =>
          this.props.onMouseEnter(this.state.row, this.state.col)
        }
        onMouseUp={() => this.props.onMouseUp(this.state.row, this.state.col)}
      >
        <div
          class={"node-" + this.state.class}
          style={{
            width: "100%",
            height: "100%"
          }}
        ></div>
      </div>
    );
  }
}

export default Node;
