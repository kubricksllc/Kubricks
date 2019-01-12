import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfoWindow from "./InfoWindow";
import NodePlot from "./NodePlot";
import * as d3 from "d3";

const random = d3.randomNormal(5, 1);
import styled from "styled-components";

const Box = styled.div`
  border: solid;
  border-width: 1px;
  height: 500x;
  width: 1000px;
`;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
      slider: 7,
      x: 0,
      y: 0,
      radius: 300,
      windowOpen: false,
      target: null
    };

    this.zoom = d3
      .zoom()
      .scaleExtent([-5, 5])
      .extent([[-100, -100], [props.width + 100, props.height + 100]])
      .on("zoom", this.zoomed.bind(this));

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.showNodeInfo = this.showNodeInfo.bind(this);
    this.hideNodeInfo = this.hideNodeInfo.bind(this);
  }

  componentDidMount() {
    d3.select(this.refs.svg).call(this.zoom);
  }

  componentDidUpdate() {
    d3.select(this.refs.svg).call(this.zoom);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }

  handleSliderChange(e) {
    this.setState({ data: [] });
    this.setState({
      data: this.getData(e.target.value, this.state.radius),
      slider: e.target.value
    });
  }

  showNodeInfo(node) {
    this.props.showNodeInfo(node);
  }

  hideNodeInfo() {
    this.props.hideNodeInfo();
  }

  render() {
    const { zoomTransform } = this.state,
      { width, height } = this.props;
    return (
      <Box id="chart">
        <svg width={width} height={height} ref="svg">
          <NodePlot
            data={this.props.data}
            x={100}
            y={-100}
            width={width / 2}
            height={height}
            zoomTransform={zoomTransform}
            zoomType="detail"
            showNodeInfo={this.showNodeInfo.bind(this)}
            hideNodeInfo={this.hideNodeInfo.bind(this)}
          />
        </svg>
      </Box>
    );
  }
}

export default Chart;
