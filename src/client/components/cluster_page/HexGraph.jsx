import React, { Component } from "react";
import NodePlot from "./NodePlot.jsx";
import * as d3 from "d3";
import styled from "styled-components";

const Box = styled.div`
  height: 100%;
  width: 100%;
  border: solid 1px;
`;

class HexGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
      slider: 7,
      x: 0,
      y: 0
    };

    this.zoom = d3
      .zoom()
      .scaleExtent([-5, 5])
      .extent([[-100, -100], [props.width + 100, props.height + 100]])
      .on("zoom", this.zoomed.bind(this));
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

  render() {
    const { zoomTransform } = this.state,
      { width, height } = this.props;

    return (
      <Box id="chart">
        <svg width={width} height={height} ref="svg">
          <NodePlot
            data={this.props.data}
            x={0}
            y={-width / 4}
            width={width / 2}
            height={height}
            zoomTransform={zoomTransform}
            zoomType="scale"
          />
        </svg>
      </Box>
    );
  }
}

export default HexGraph;
