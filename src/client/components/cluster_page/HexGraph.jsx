import React, { Component } from "react";
import NodePlot from "./NodePlot.jsx";
import * as d3 from "d3";
import styled from "styled-components";

const Box = styled.div`
  height: 100%;
  width: 100%;
`;

class HexGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
      slider: 7,
      x: 0,
      y: 0,
      svgWidth: this.props.width,
      svgHeight: this.props.height
    };

    this.zoom = d3
      .zoom()
      .scaleExtent([-5, 5])
      .extent([[-100, -100], [props.width + 100, props.height + 100]])
      .on("zoom", this.zoomed.bind(this));
  }

  componentDidUpdate() {
    d3.select(this.refs.svg).call(this.zoom);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }

  render() {
    const { zoomTransform } = this.state,
      { width, height, initialWrapper } = this.props;
    // console.log(initialWrapper);
    return (
      <Box id="chart">
        <svg width={width} height={height} ref="svg">
          <NodePlot
            data={this.props.data}
            x={0}
            y={-this.state.svgWidth / 3}
            width={initialWrapper.width / 2}
            height={initialWrapper.height}
            zoomTransform={zoomTransform}
            zoomType="scale"
          />
        </svg>
      </Box>
    );
  }
}

export default HexGraph;
