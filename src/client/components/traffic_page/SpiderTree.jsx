import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { displayPodInfo, hidePodInfo } from "../redux/actions/windowActions.js";
import { connect } from "react-redux";
import { throws } from "assert";

const Box = styled.div`
  height: 1000x;
  width: 1000px;
  border: 2px solid;
`;

class SpiderTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
      loaded: false
    };
    this.zoom = d3.zoom().on("zoom", this.zoomed.bind(this));
    this.handleNodeOver = this.handleNodeOver.bind(this);
    this.handleNodeOut = this.handleNodeOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    (this.mouseX = 0), (this.mouseY = 0);
  }

  componentDidMount() {
    d3.select(this.refs.svg).call(this.zoom);
    this.buildTree();
    this.drawTree();
  }

  componentDidUpdate(prevProps) {
    d3.select(this.refs.svg)
      .select("svg")
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
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  }

  drawTree() {
    const radius = 1000;

    const tree = data =>
      d3
        .tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)(
        d3.hierarchy(data)
      );
    const treeData = d3.hierarchy(this.props.data);
    const root = tree(treeData);

    const svg = d3.select(this.refs.svg).select("svg");
    const link = svg
      .append("g")
      .attr("id", "link_layer")
      .attr("stroke", "black")
      .attr("stroke-opacity", .9)
      .attr("stroke-width", 3)
      .selectAll("path")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "links")
      .attr(
        "d",
        d3
          .linkRadial()
          .angle(d => d.x)
          .radius(d => d.y)
      )
      .attr("fill", d => {
        // console.log(d);
        if (
          d.target.depth > 1 &&
          d.target.data.data.attributes.containerPort !==
            d.target.data.parent.data.attributes.targetPort
        ) {
          return "red";
        } else {
          return "none";
        }
      });

    d3.select("#link_layer").attr("transform", this.state.zoomTransform);

    let nodeIndex = -1;
    const node = svg
      .append("g")
      .attr("id", "node_layer")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr(
        "transform",
        d => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      );

    node
      .append("circle")
      .attr("fill", d => d.data.data.fill)
      .attr("r", 40);

    node
      .selectAll("circle")
      .on("mouseover", this.handleNodeOver)
      .on("mouseout", this.handleNodeOut);

    node
      .append("text")
      .attr("dy", "2em")
      .attr("x", d => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr("text-anchor", d =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      .attr("transform", d => (d.x >= Math.PI ? "rotate(180)" : null))
      .text(d => d.data.data.name)
      .style("font-size", "2em")
      .clone(true)
      .lower()
      .attr("stroke", "white");

    d3.select("#node_layer").attr("transform", this.state.zoomTransform);
    d3.select("#link_layer").style("margin", "auto");
    d3.select("#node_layer").style("margin", "auto");
  }

  handleNodeOver(node) {
    console.log(this.mouseX, this.mouseY);
    if (node.depth === 2) {
      //pod
      this.props.displayPodInfo(node.data.data.otherAttr.podIdx, {
        x: this.mouseX + 50,
        y: this.mouseY - 100
      });
    } else if (node.depth === 1) {
      //service
    }
  }

  handleNodeOut(node) {
    console.log("HHHH");
    if (node.depth === 2) {
      //pod
      this.props.hidePodInfo(node.data.data.otherAttr.podIdx, {
        x: this.mouseX,
        y: this.mouseY
      });
    } else if (node.depth === 1) {
      //service
    }
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  render() {
    return <Box id="chart" onMouseMove={this.handleMouseMove} ref="svg" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayPodInfo: (podIndex, mouseInfo) =>
      dispatch(displayPodInfo(podIndex, mouseInfo)),
    hidePodInfo: podIndex => dispatch(hidePodInfo(podIndex))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SpiderTree);
