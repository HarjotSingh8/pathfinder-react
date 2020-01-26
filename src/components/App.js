import React, { Component } from "react";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    rows: 10,
    cols: 10
  };
  getrowscols = () => {
    return { rows: this.state.rows, cols: this.state.cols };
  };
  updaterowscols = (r, c) => {
    this.setState({ rows: r, cols: c });
  };
  render() {
    return (
      <div class="App container-fluid">
        <Header />
      </div>
    );
  }
}

export default App;
