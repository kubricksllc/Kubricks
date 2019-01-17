import React, { Component } from "react";
import { connect } from "react-redux";
import InfoWindow from "../../layout/InfoWindow.jsx";
import HexGraph from "./HexGraph.jsx";
import { nodesFetchData } from "../redux/actions/nodesActions.js";
import styled from "styled-components";

class ClusterPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "Cluster",
      data: []
    };
    this.showNodeInfo = this.showNodeInfo.bind(this);
    this.hideNodeInfo = this.hideNodeInfo.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    this.props.fetchData("http://localhost:8080/api/nodes");
  }

  componentDidUpdate(prevProps, prevState) {
    //IF THEW NODE LIST CHANGES UPDATE IT

    if (this.props.listOfNodes !== prevProps.listOfNodes) {
      this.setState({ data: this.getNodes(this.props.listOfNodes) });
    }
  }

  getNodes(listOfNodes, radius = 200) {
    var nodes = [],
      width = radius * 2 + 50,
      height = radius * 2 + 50,
      angle,
      x,
      y,
      j = 0,
      ring = 1;

    const sides = 6;
    while (j < listOfNodes.length) {
      for (let i = 0; j < listOfNodes.length && i < ring * sides; i++) {
        angle = (i / ((ring * sides) / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        // For a semicircle, we would use (i / numNodes) * Math.PI.
        x = ((radius * ring) / 2) * Math.cos(angle) + width / 2; // Calculate the x position of the element.
        y = ((radius * ring) / 2) * Math.sin(angle) + height / 2; // Calculate the y position of the element.

        const copyData = listOfNodes[j];
        const fillNode = {};
        fillNode.name = copyData.name;
        fillNode.status = copyData.status;
        fillNode.age = copyData.age;
        fillNode.version = copyData.version;
        fillNode.x = x;
        fillNode.y = y;
        fillNode.index = j;
        nodes[j++] = fillNode;
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
    if (this.props.listOfNodes !== undefined) {
      return (
        <div>
          <div onMouseMove={this.handleMouseMove}>
            <HexGraph data={this.state.data} width={1000} height={800} />
          </div>
          {this.props.nodeInfoOpen && <InfoWindow />}
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    listOfNodes: state.nodesReducer.listOfNodes,
    nodeInfoOpen: state.windowReducer.nodeInfoOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(nodesFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClusterPage);
