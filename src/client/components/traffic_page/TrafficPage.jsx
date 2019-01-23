import React, { Component } from "react";
import SpiderTree from "./SpiderTree.jsx";
import buildTreeData from "./BuildTree.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InfoWindow from "../../layout/InfoWindow.jsx";

class TrafficPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SpiderTree
          data={buildTreeData(
            this.props.activeServices,
            this.props.listOfServices,
            this.props.listOfPods
          )}
          width={1000}
          height={500}
        />
        {this.props.podInfoOpen && <InfoWindow />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    listOfPods: state.podsReducer.listOfPods,
    podInfoOpen: state.windowReducer.podInfoOpen
  };
};

export default withRouter(connect(mapStateToProps)(TrafficPage));
