import React, { Component } from "react";
import Header from "./header";
import Grid from "./grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Node from "./node";

class App extends Component {
  state = {
    rows: 18,
    cols: 32,
    grid: [],
    closestNodes: [],
    mousedown: false,
    start: false,
    end: false
  };
  constructor() {
    super();
  }
  getrowscols = () => {
    return { rows: this.state.rows, cols: this.state.cols };
  };
  updaterows = r => {
    this.setState({ rows: r });
    this.creategrid();
  };
  updatecols = c => {
    this.setState({ cols: c });
    this.creategrid();
  };
  componentDidMount() {
    this.creategrid();
  }
  creategrid = () => {
    let grid = [];
    for (let i = 0; i < this.state.rows; i++) {
      let newrow = [];
      for (let j = 0; j < this.state.cols; j++) {
        newrow.push({
          isWall: false,
          isStart: false,
          isFinish: false,
          isVisited: false,
          row: i,
          col: j,
          rows: this.state.rows,
          cols: this.state.cols,
          handleMouseDown: this.handleMouseDown,
          handleMouseEnter: this.handleMouseEnter,
          handleMouseUp: this.handleMouseUp
        });
      }
      grid.push(newrow);
    }
    this.setState({ grid });
    console.log(grid);
    return grid;
  };
  handleMouseDown = (row, col) => {
    if (this.state.start == false) {
      let g = this.updatestart(this.state.grid, row, col);
      this.setState({ grid: g, start: true });
    } else if (this.state.end == false) {
      let g = this.updateend(this.state.grid, row, col);
      this.setState({ grid: g, end: true });
    } else {
      console.log("wallupdated");
      let g = this.updatewall(this.state.grid, row, col);
      this.setState({ grid: g, mousedown: true });
    }
  };
  handleMouseEnter = (row, col) => {
    //console.log("entered");
    if (this.state.mousedown == true) {
      //this.updatewall(this.state.grid, row, col);
      let g = this.updatewall(this.state.grid, row, col);
      this.setState({ grid: g });
    }
  };
  handleMouseUp = () => {
    console.log("up");
    this.setState({ mousedown: false });
  };
  updatewall = (grid, row, col) => {
    console.log(row);
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  updatestart = (grid, row, col) => {
    console.log(row);
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  updateend = (grid, row, col) => {
    console.log(row);
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  render() {
    return (
      <div className="App" style={{ height: "100vh" }}>
        <Header
          rows={this.state.rows}
          cols={this.state.cols}
          updaterows={this.updaterows}
          updatecols={this.updatecols}
        />
        <div
          className="row ml-0 bg-white text-dark justify-content-center"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="grid row mx-auto" style={{ width: "100%" }}>
            {this.state.grid.map((row, rowIdx) => {
              return (
                <div className="row mx-auto" key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      row,
                      col,
                      isFinish,
                      isStart,
                      isWall,
                      isVisited
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        rows={this.state.rows}
                        cols={this.state.cols}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        isVisited={isVisited}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
