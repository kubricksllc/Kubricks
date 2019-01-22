import React, { Component } from "react";
import {
  displayNodeInfo,
  hideNodeInfo
} from "../redux/actions/windowActions.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as d3 from "d3";

class WorkerNode extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = { transform: "scale(1)" };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.scaling && !prevState.scaling) {
      const target = this.state.intialSize * 1.2;
      const scale = function() {
        if (this.state.size <= target) {
          this.setState({ size: this.state.size + 1 });
          if (!this.state.descaling) {
            setTimeout(scale, 2);
          }
        } else {
          this.setState({ scaling: false });
        }
      }.bind(this);
      scale();
    } else if (this.state.descaling && !prevState.descaling) {
      const target = this.state.intialSize;
      const descale = function() {
        if (this.state.size != target) {
          this.setState({ size: this.state.size - 1 });
          if (!this.state.scaling) {
            setTimeout(descale, 2);
          }
        } else this.setState({ descaling: false });
      }.bind(this);
      descale();
    }
  }

  handleMouseEnter(e) {
    this.props.displayNodeInfo(this.props.nodeIndex, {
      x: e.clientX + 50,
      y: e.clientY - 100
    });
  }

  handleMouseLeave(e) {
    this.props.hideNodeInfo(this.props.nodeIndex);
    this.setState({ transform: "scale(1)" });
  }

  handleOnClick(e) {
    this.props.hideNodeInfo(e.target.getAttribute("nodeIndex"));
  }

  render() {
    const dist = this.state.size;
    const { xScale, yScale } = this.props;

    return (
      <Link to={`/node`}>
        <svg
          width="100"
          height="116"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          x={xScale}
          y={yScale}
          id={`node#${this.props.nodeIndex}`}
        >
          <g>
            <rect
              fill="none"
              id="canvas_background"
              height="118"
              width="102"
              y="-1"
              x="-1"
            />
            <g
              display="none"
              overflow="visible"
              y="0"
              x="0"
              height="100%"
              width="100%"
              id="canvasGrid"
            >
              <rect
                fill="url(#gridpattern)"
                stroke-width="0"
                y="0"
                x="0"
                height="100%"
                width="100%"
              />
            </g>
          </g>
          <g>
            <path
              transform="rotate(90 49.999996185302734,58.00000381469727) "
              stroke="#326de6"
              id="svg_4"
              d="m-6.33334,58.000004l24.142862,-48.285717l64.380961,0l24.142855,48.285717l-24.142855,48.285717l-64.380961,0l-24.142862,-48.285717z"
              fill-opacity="null"
              stroke-opacity="null"
              stroke-width="2"
              fill="#fff"
            />
          </g>
        </svg>
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayNodeInfo: (nodeIndex, mouseInfo) =>
      dispatch(displayNodeInfo(nodeIndex, mouseInfo)),
    hideNodeInfo: (nodeIndex, mouseInfo) =>
      dispatch(hideNodeInfo(nodeIndex, mouseInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WorkerNode);
