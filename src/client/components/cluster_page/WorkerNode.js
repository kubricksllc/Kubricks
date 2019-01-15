import React, { Component } from "react";
import { toggleInfoWindow } from "../redux/actions/windowActions.js";
import { connect } from "react-redux";

class WorkerNode extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { intialSize: 10, size: 10, scaling: false, descaling: false };
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
    this.props.toggleInfoWindow(e.target.getAttribute("nodeIndex"), {
      x: e.clientX,
      y: e.clientY
    });
    this.setState({ scaling: true, descaling: false });
  }

  handleMouseLeave(e) {
    this.props.toggleInfoWindow(e.target.getAttribute("nodeIndex"));
    this.setState({ scaling: false, descaling: true });
  }

  render() {
    const dist = this.state.size;
    const offsetX = 1.5;
    const offsetY = 1.6;
    const scaleX = this.props.scaleX;
    const scaleY = this.props.scaleY;
    return (
      <polygon
        points={`${scaleX}, ${scaleY - dist * 3.3}
               ${scaleX + dist * 2.7}, ${scaleY - dist * 1.5} 
               ${scaleX + dist * 2.7}, ${scaleY + dist * 1.5}
               ${scaleX}, ${scaleY + dist * 3.3}
               ${scaleX - dist * 2.7}, ${scaleY + dist * 1.5}
               ${scaleX - dist * 2.7}, ${scaleY - dist * 1.5}
             `}
        fill="#003366"
        nodeIndex={this.props.nodeIndex}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleInfoWindow: (nodeIndex, mouseInfo) =>
      dispatch(toggleInfoWindow(nodeIndex, mouseInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WorkerNode);
