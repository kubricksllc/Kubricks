import React, { Component } from "react";

class WorkerNode extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { intialSize: 10, size: 10 };
  }

  handleMouseEnter(e) {
    this.props.showNodeInfo(this.props.info);
    const target = this.state.intialSize * 1.3;
    const scale = function() {
      if (this.state.size <= target) {
        this.setState({ size: this.state.size + 1 });
        setTimeout(scale, 10);
      }
    }.bind(this);
    scale();
  }

  handleMouseLeave(e) {
    this.props.hideNodeInfo();
    const target = this.state.intialSize;
    const descale = function() {
      if (this.state.size != target) {
        this.setState({ size: this.state.size - 1 });
        setTimeout(descale, 2);
      }
    }.bind(this);
    descale();
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
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default WorkerNode;
