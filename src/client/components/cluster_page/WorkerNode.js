import React, { Component } from "react";

class WorkerNode extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    this.props.showNodeInfo(this.props.info);
  }

  handleMouseLeave(e) {
    this.props.hideNodeInfo();
  }

  render() {
    const dist = 20;
    const offsetX = 1.5;
    const offsetY = 1.6;
    const scaleX = this.props.scaleX;
    const scaleY = this.props.scaleY;
    return (
      <polygon
        points={`${scaleX},${scaleY}
               ${scaleX + dist * offsetX}, ${scaleY - dist} 
               ${scaleX + dist * 2 * offsetX}, ${scaleY}
               ${scaleX + dist * 2 * offsetX}, ${scaleY + dist * offsetY}
               ${scaleX + dist * offsetX}, ${scaleY + dist * 1.6 * offsetY}
               ${scaleX}, ${scaleY + dist * offsetY}
             `}
        fill="#003366"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default WorkerNode;
