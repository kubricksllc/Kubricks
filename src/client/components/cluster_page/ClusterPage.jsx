import React, { Component } from 'react';
import { connect } from 'react-redux';
import HexGraph from './HexGraph.jsx';
import { nodesFetchData } from '../redux/actions/nodesActions.js';

class ClusterPage extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Cluster',
      data: []
    };
  }

  componentDidMount() {
    this.props.fetchData('http://localhost:8080/api/nodes');
  }

  componentDidUpdate(prevProps) {
    //IF THEW NODE LIST CHANGES UPDATE IT

    if (this.props.listOfNodes !== prevProps.listOfNodes) {
      this.setState({ data: this.getNodes(this.props.listOfNodes, 500) });
    }
  }

  getNodes(listOfNodes, radius) {
    //Segment the data set by ring lengths
    let sides = 6,
      count = 0,
      ring = 1;
    const segments = [];
    while (count < listOfNodes.length) {
      let segment = [];
      for (let i = 0; i < ring * sides && count < listOfNodes.length; i++) {
        segment.push(listOfNodes[count++]);
      }
      segments.push(segment);
      ring++;
    }

    let nodes = [],
      width = radius * 2 + 50,
      height = radius * 2 + 50,
      index = 0,
      angle,
      x,
      y;

    for (let i = 0; i < segments.length; i++) {
      for (let j = 0; j < segments[i].length; j++) {
        angle = (j / (segments[i].length / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        // For a semicircle, we would use (i / numNodes) * Math.PI.
        x = ((radius * (i + 1)) / 2) * Math.cos(angle) + width / 2; // Calculate the x position of the element.
        y = ((radius * (i + 1)) / 2) * Math.sin(angle) + height / 2; // Calculate the y position of the element.

        let node = Object.assign({}, segments[i][j]);
        node.x = x;
        node.y = y;
        node.index = index;
        nodes[index++] = node;
      }
    }
    return nodes;
  }

  render() {
    if (this.props.listOfNodes !== undefined) {
      return (
        <div>
          <div onMouseMove={this.handleMouseMove}>
            <HexGraph
              data={this.state.data}
              width={this.props.width}
              height={this.props.height}
              initialWrapper={this.props.initialWrapper}
            />
          </div>
          {/* {this.props.nodeInfoOpen && <InfoWindow />} */}
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
