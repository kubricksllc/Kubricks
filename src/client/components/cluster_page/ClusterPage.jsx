import React, { Component } from "react";
import { connect } from 'react-redux';
import WorkerNode from "./WorkerNode";
import InfoWindow from "./InfoWindow";
import Chart from "./Chart";
import { clusterFetchData } from '../redux/actions/clusterActions.js';
import styled from "styled-components";

const Box = styled.div`
  border: solid;
  width: 50%;
  height: 50vh;
`;

class ClusterPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "Cluster",
      windowOpen: false,
      target: null,
      data: [],
      mouseX: 0,
      mouseY: 0
    };
    this.showNodeInfo = this.showNodeInfo.bind(this);
    this.hideNodeInfo = this.hideNodeInfo.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('localhost:8080/api/nodes');
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

  getNodes(nodes, radius = 200) {
    var width = radius * 2 + 50,
      height = radius * 2 + 50,
      angle,
      x,
      y,
      j = 0,
      ring = 1;

    const sides = 6;
    while (j < nodes.length) {
      for (let i = 0; j < nodes.length && i < ring * sides; i++) {
        angle = (i / ((ring * sides) / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        // For a semicircle, we would use (i / numNodes) * Math.PI.
        x = ((radius * ring) / 2) * Math.cos(angle) + width / 2; // Calculate the x position of the element.
        y = ((radius * ring) / 2) * Math.sin(angle) + height / 2; // Calculate the y position of the element.
        nodes[j].x = x;
        nodes[j].y = y;
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

  handleMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  render() {
    return (
      <div>
        <div onMouseMove={this.handleMouseMove}>
          <Chart
            data={this.state.data}
            width={1000}
            height={500}
            mouseX={this.state.mouseX}
            mouseY={this.state.mouseY}
            showNodeInfo={this.showNodeInfo}
            hideNodeInfo={this.hideNodeInfo}
          />
        </div>
        {this.state.windowOpen && (
          <InfoWindow
            node={this.state.target}
            mouseX={this.state.mouseX}
            mouseY={this.state.mouseY}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listOfNodes: state.listOfNodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(clusterFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClusterPage);