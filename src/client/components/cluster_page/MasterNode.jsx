import React, { Component } from "react";

class MasterNode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dist = 10;
    const { xScale, yScale } = this.props;

    if (!Number.isNaN(xScale) && !Number.isNaN(yScale)) {
      return (
        <polygon
          points={`${xScale}, ${yScale - dist * 3}
              ${xScale + dist * 2.3}, ${yScale - dist * 1.8} 
              ${xScale + dist * 2.8}, ${yScale + dist * 0.5}
              ${xScale + dist * 1.4}, ${yScale + dist * 2.6}
              ${xScale - dist * 1.4}, ${yScale + dist * 2.6}
              ${xScale - dist * 2.8}, ${yScale + dist * 0.5}
              ${xScale - dist * 2.3}, ${yScale - dist * 1.8} 
              
        `}
          fill="white"
          stroke="#326DE6"
          stroke-width="3"
        />
      );
    } else return <div />;
  }
}

export default MasterNode;
