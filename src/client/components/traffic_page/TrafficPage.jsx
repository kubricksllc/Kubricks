import React, { Component } from "react";
import SpiderTree from "./SpiderTree.jsx";
import buildTreeData from "./BuildTree.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class TrafficPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <SpiderTree data={buildTreeData(
      this.props.activeServices,
      this.props.listOfServices,
      this.props.listOfPods
    )} width={1000} height={1000} />;
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    listOfPods: state.podsReducer.listOfPods,
    infoWindowOpen: state.windowReducer.infoWindowOpen
  };
};

export default withRouter(connect(mapStateToProps)(TrafficPage));
