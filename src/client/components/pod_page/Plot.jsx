import React, { Component } from 'react';
import * as d3 from 'd3';

import Scatterplot from './Scatterplot.jsx';

const random = d3.randomNormal(5, 1);

export default class Plot extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: d3.range(200).map(_ => [random(), random()]),
        zoomTransform: null
      }
      this.zoom = d3.zoom()
                    .scaleExtent([-5, 5])
                    .translateExtent([[-100, -100], [props.width+100, props.height+100]])
                    .extent([[-100, -100], [props.width+100, props.height+100]])
                    .on("zoom", this.zoomed.bind(this))
    }
    
    componentDidMount() {
      d3.select(this.refs.svg)
        .call(this.zoom)
    }

    componentDidUpdate() {
      d3.select(this.refs.svg)
        .call(this.zoom)
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
        <svg width={width} height={height} ref="svg">
          <Scatterplot data={this.state.data}
                       x={0} y={0} 
                       width={width/2}
                       height={height}
                       zoomTransform={zoomTransform}
                       zoomType="scale" />
          <Scatterplot data={this.state.data}
                       x={width/2} y={0}
                       width={width/2}
                       height={height}
                       zoomTransform={zoomTransform}
                       zoomType="detail" />
        </svg>
      )
    }
  }