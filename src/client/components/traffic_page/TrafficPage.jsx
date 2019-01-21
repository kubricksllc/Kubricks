import React, { Component } from "react";
import SpiderTree from "./SpiderTree.jsx";
import mockdata from "./mockdata.js";

class ClusterPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "Cluster",
      data: []
    };
  }

  render() {
    console.log(mockdata);
    return <SpiderTree data={mockdata} width={1000} height={500} />;
  }
}

export default ClusterPage;
