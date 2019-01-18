import React, { Component } from "react";
import * as d3 from "d3";
import WorkerNode from "./WorkerNode.jsx";
import MasterNode from "./MasterNode.jsx";

class NodePlot extends Component {
  constructor(props) {
    super(props);
    this.updateD3(props);
  }
  componentWillUpdate(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    const { data, width, height, zoomTransform, zoomType } = props;
    (this.xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, node => node.x)])
      .range([0, width])),
      (this.yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, node => node.y)])
        .range([0, height]));

    if (zoomTransform && zoomType === "detail") {
      this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
      this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
    }
  }

  get transform() {
    const { x, y, zoomTransform, zoomType } = this.props;
    let transform = "";

    if (zoomTransform && zoomType === "scale") {
      transform = `translate(${x + zoomTransform.x}, ${y +
        zoomTransform.y}) scale(${zoomTransform.k})`;
    } else {
      transform = `translate(${x}, ${y})`;
    }
    return transform;
  }

  render() {
    const { data } = this.props;
    const firstX = data[0] !== undefined ? data[0].x : 0;
    const firstY = data[0] !== undefined ? data[0].y : 0;

    let i = 0;
    return (
      <g transform={this.transform} ref="scatterplot">
        <MasterNode xScale={this.xScale(firstX - 250)} yScale={this.yScale(firstY)} />
        {data.map(node => {
          return (
            <WorkerNode
              key={i++}
              xScale={this.xScale(node.x)}
              yScale={this.yScale(node.y)}
              nodeIndex={node.index}
              nodeName={node.name}
            />
          );
        })}
      </g>
    );
  }
}

export default NodePlot;
