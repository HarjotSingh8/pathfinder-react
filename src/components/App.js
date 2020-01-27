import React, { Component } from "react";
import Header from "./header";
import Grid from "./grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Node from "./node";
import dijsktra from "./dijsktra";
import { act } from "react-dom/test-utils";
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
class App extends Component {
  state = {
    rows: 18,
    cols: 32,
    grid: [],
    closestNodes: [],
    mousedown: false,
    start: false,
    startx: null,
    starty: null,
    end: false,
    endx: null,
    endy: null,
    visualiseList: [],
    path: false,
    animateOrder: [],
    distance: 0
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
  componentDidUpdate() {
    console.log("updated");
    /*if (this.state.animateOrder.length > 0) {
      let visited = this.state.animateOrder;
      let grid = this.state.grid;
      grid[visited[0].x][visited[0].y].visitanimate = true;
      visited.shift();
      this.setState({ grid, animateOrder: visited });
    }*/
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
          visitanimate: false,
          prevrow: null,
          prevcol: null,
          row: i,
          col: j,
          rows: this.state.rows,
          cols: this.state.cols,
          handleMouseDown: this.handleMouseDown,
          handleMouseEnter: this.handleMouseEnter,
          handleMouseUp: this.handleMouseUp,
          distance: Infinity
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
      this.setState({ grid: g, start: true, startx: col, starty: row });
    } else if (this.state.end == false) {
      let g = this.updateend(this.state.grid, row, col);
      this.setState({ grid: g, end: true, endx: col, endy: row });
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
    //console.log("up");
    this.setState({ mousedown: false });
  };

  updatewall = (grid, row, col) => {
    //console.log(row);
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
    //console.log(row);
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
    //console.log(row);
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  findpath = async () => {
    if (this.state.path == false && this.state.startx != null) {
      let activeNodes = [];
      let order = [];
      let g = this.state.grid;
      let dist = 0;
      activeNodes.push({ y: this.state.startx, x: this.state.starty });
      g[this.state.starty][this.state.startx].distance = 0;
      while (activeNodes.length > 0) {
        let x = activeNodes[0].x;
        let y = activeNodes[0].y;
        let d = g[x][y].distance;
        if (this.checkneighbour(g, x + 1, y)) {
          activeNodes.push({ x: x + 1, y: y });
          order.push({ x: x + 1, y: y });
          g[x + 1][y].prevcol = activeNodes[0][x];
          g[x + 1][y].prevrow = activeNodes[0][y];
          g[x + 1][y].isVisited = true;
          g[x + 1][y].distance = d + 1;
        }
        if (this.checkneighbour(g, x, y + 1)) {
          activeNodes.push({ x: x, y: y + 1 });
          order.push({ x: x, y: y + 1 });
          g[x][y + 1].prevcol = activeNodes[0][x];
          g[x][y + 1].prevrow = activeNodes[0][y];
          g[x][y + 1].isVisited = true;
          g[x][y + 1].distance = d + 1;
        }
        if (this.checkneighbour(g, x - 1, y)) {
          activeNodes.push({ x: x - 1, y: y });
          order.push({ x: x - 1, y: y });
          g[x - 1][y].prevcol = activeNodes[0][x];
          g[x - 1][y].prevrow = activeNodes[0][y];
          g[x - 1][y].isVisited = true;
          g[x - 1][y].distance = d + 1;
        }
        if (this.checkneighbour(g, x, y - 1)) {
          activeNodes.push({ x: x, y: y - 1 });
          order.push({ x: x, y: y - 1 });
          g[x][y - 1].prevcol = activeNodes[0][x];
          g[x][y - 1].prevrow = activeNodes[0][y];
          g[x][y - 1].isVisited = true;
          g[x][y - 1].distance = d + 1;
        }
        console.log("dist" + d);
        activeNodes.shift();
        await sleep(0.1);
        if (dist < d - 2) {
          dist = d;
          this.setState({ grid: g });
        }
      }
      /*while (order.length > 0) {
        order.shift();
      }*/
      this.setState({ grid: g });
      console.log("ran");
    }
  };
  checkneighbour = (g, x, y) => {
    console.log(x + "," + y);
    if (
      x >= 0 &&
      x < this.state.rows &&
      y >= 0 &&
      y < this.state.cols &&
      g[x][y].isVisited == false &&
      g[x][y].isWall == false
    )
      return { x, y };
  };
  render() {
    return (
      <div className="App" style={{ height: "100vh" }}>
        <Header
          rows={this.state.rows}
          cols={this.state.cols}
          updaterows={this.updaterows}
          updatecols={this.updatecols}
          findpath={this.findpath}
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
                      isVisited,
                      distance
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
                        distance={distance}
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
