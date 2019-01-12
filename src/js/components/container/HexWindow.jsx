import React, { Component } from "react";
import WorkerNode from "../presentational/WorkerNode";
import ReactDOM from "react-dom";
import InfoWindow from "../presentational/InfoWindow";
import Chart from "../presentational/Chart";

import styled from "styled-components";

const Box = styled.div`
  border: solid;
  width: 50%;
  height: 50vh;
`;

class HexWindow extends Component {
  constructor() {
    super();
    this.state = {
      title: "Cluster",
      windowOpen: false,
      target: null,
      data: []
    };
    this.showNodeInfo = this.showNodeInfo.bind(this);
    this.hideNodeInfo = this.hideNodeInfo.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: this.getNodes(12, 100)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //IF THEW NODE LIST CHANGES UPDATE IT
    // this.setState({ nodes: [] });
    // this.setState({
    //   nodes: this.createNodes(e.target.value, this.state.radius),
    //   slider: e.target.value
    // });
  }

  getNodes(numNodes, radius) {
    var nodes = [],
      width = radius * 2 + 50,
      height = radius * 2 + 50,
      angle,
      x,
      y,
      j = 0,
      ring = 1;

    const sides = 6;
    while (j < numNodes) {
      for (let i = 0; j < numNodes && i < ring * sides; i++) {
        angle = (i / ((ring * sides) / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        // For a semicircle, we would use (i / numNodes) * Math.PI.
        x = ((radius * ring) / 2) * Math.cos(angle) + width / 2; // Calculate the x position of the element.
        y = ((radius * ring) / 2) * Math.sin(angle) + height / 2; // Calculate the y position of the element.
        nodes.push([x, y, angle]);
        j++;
      }
      ring++;
    }
    return nodes;
  }

  showNodeInfo(node) {
    this.setState({ windowOpen: true, target: node });
  }

  hideNodeInfo() {
    this.setState({ windowOpen: false });
  }

  render() {
    return (
      <div>
        <Chart
          data={this.state.data}
          width={1000}
          height={500}
          mouseX={this.props.mouseX}
          mouseY={this.props.mouseY}
          showNodeInfo={this.showNodeInfo}
          hideNodeInfo={this.hideNodeInfo}
        />
        {this.state.windowOpen && (
          <InfoWindow
            node={this.state.target}
            mouseX={this.props.mouseX}
            mouseY={this.props.mouseY}
          />
        )}
      </div>
    );
  }
}

export default HexWindow;
