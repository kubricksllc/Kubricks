import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {
  displayPodInfo,
  hidePodInfo,
  displayServiceInfo,
  hideServiceInfo
} from '../redux/actions/windowActions.js';
import { connect } from 'react-redux';

const Box = styled.div`
  height: 100%;
  width: 100%;
`;

class SpiderTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
      loaded: false
    };
    this.podStatus = {green:"Running", red:"Failed", yellow:"Pending", grey:"Unknown", black:"Succeeded"}
    this.zoom = d3.zoom().on('zoom', this.zoomed.bind(this));
    this.handleNodeEnter = this.handleNodeEnter.bind(this);
    this.handleNodeOut = this.handleNodeOut.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    d3.select(this.refs.svg).call(this.zoom);
    d3.select(this.refs.svg).call(
      this.zoom.transform,
      d3.zoomIdentity.translate(this.props.width / 2, 250).scale(5)
    );
    this.buildTree();
    this.drawTree();
  }

  componentDidUpdate(prevProps) {
    d3.select(this.refs.svg)
      .select('svg')
      .remove();
    d3.select(this.refs.svg).call(this.zoom);
    this.buildTree();
    this.drawTree();
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }

  buildTree() {
    const width = this.props.width;
    const height = this.props.height;

    let svg = d3
      .select(this.refs.svg)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  drawTree() {
    const radius = 30 * this.props.activeServices.length;
    const tree = data =>
      d3
        .tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)(
        d3.hierarchy(data)
      );
    const treeData = d3.hierarchy(this.props.data);
    const root = tree(treeData);

    const svg = d3.select(this.refs.svg).select('svg');
    const link = svg
      .append('g')
      .attr('id', 'link_layer')
      .attr('stroke', 'green')
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', 0.5)
      .selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', d => {
        if (
          d.target.depth > 1 &&
          d.target.data.data.attributes.containerPort !==
            d.target.data.parent.data.attributes.targetPort
        ) {
          return 'miss-link';
        } else if (d.target.data.data.name === 'No_Service') {
          return 'no-service';
        } else {
          return 'link';
        }
      })
      .attr(
        'd',
        d3
          .linkRadial()
          .angle(d => d.x)
          .radius(d => d.y)
      )
      .style('fill-opacity', 0.7)
      .style('fill', 'none');

    d3.selectAll('.miss-link').attr('stroke', 'red');
    d3.selectAll('.no-service').attr('stroke', 'grey');

    d3.select('#link_layer').attr('transform', this.state.zoomTransform);

    let nodeIndex = -1;
    const node = svg
      .append('g')
      .attr('id', 'node_layer')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', node)
      .attr(
        'transform',
        d => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      );

    node
      .append('circle')
      .attr('id', d => d.data.data.name)
      .attr('fill', d => d.data.data.fill)
      .attr('r', `2`);

    node
      .selectAll('circle')
      .on('mouseenter', this.handleNodeEnter)
      .on('mouseout', this.handleNodeOut)
      .on('click', this.handleNodeClick)
      .append('title')
      .text(d => {
        if (d.depth === 1) {
          return `Port: ${d.data.data.attributes.listeningPort}\nTarget: ${
            d.data.data.attributes.targetPort
          }`;
        } else if (d.depth === 2) {
          return `Status: ${this.podStatus[d.data.data.fill]}\nPort: ${d.data.data.attributes.containerPort}`;
        }
      });

    node
      .append('text')
      .attr('dy', 0)
      .attr('x', d => (d.x < Math.PI === !d.children ? 3 : -3))
      .attr('text-anchor', d =>
        d.x < Math.PI === !d.children ? 'start' : 'end'
      )
      .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
      .text(d => d.data.data.name)
      .style('font-size', '2px')
      .clone(true)
      .lower();

    d3.select('#node_layer').attr('transform', this.state.zoomTransform);
    d3.select('#link_layer').style('margin', 'auto');
    d3.select('#node_layer').style('margin', 'auto');
  }

  handleNodeEnter(node) {
    d3.select(`#${node.data.data.name}`).attr('r', '2.5');
    if (node.depth === 2) {
      //pod
      this.props.displayPodInfo(node.data.data.otherAttr.podIdx);
    } else if (node.depth === 1) {
      //service
      if (node.data.data.name !== 'No_Service') {
        this.props.displayServiceInfo(node.data.data.otherAttr.serviceIdx);
      }
    }
  }

  handleNodeOut(node) {
    d3.select(`#${node.data.data.name}`).attr('r', '2');
    if (node.depth === 2) {
      //pod
      this.props.hidePodInfo(node.data.data.otherAttr.podIdx, {
        x: this.mouseX,
        y: this.mouseY
      });
    } else if (node.depth === 1) {
      //service
      if (node.data.data.name !== 'No_Service') {
        this.props.hideServiceInfo(node.data.data.otherAttr.serviceIdx, {
          x: this.mouseX,
          y: this.mouseY
        });
      }
    }
  }

  handleNodeClick(node) {
    console.log(node);
  }

  render() {
    return <Box id="chart" ref="svg" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayPodInfo: podIndex => dispatch(displayPodInfo(podIndex)),
    hidePodInfo: podIndex => dispatch(hidePodInfo(podIndex)),
    displayServiceInfo: serviceIndex =>
      dispatch(displayServiceInfo(serviceIndex)),
    hideServiceInfo: serviceIndex => dispatch(hideServiceInfo(serviceIndex))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SpiderTree);
