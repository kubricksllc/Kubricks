import React, { Component } from 'react';
import SpiderTree from './SpiderTree.jsx';
import buildTreeData from './BuildTree.js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoWindow from '../../layout/InfoWindow.jsx';

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
          activeServices={this.props.activeServices}
          width={this.props.width}
          height={this.props.height}
        />
        {/* {this.props.serviceInfoOpen && <InfoWindow />}
        {this.props.podInfoOpen && <InfoWindow />} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    serviceInfoOpen: state.windowReducer.serviceInfoOpen,
    listOfPods: state.podsReducer.listOfPods,
    podInfoOpen: state.windowReducer.podInfoOpen
  };
};

export default withRouter(connect(mapStateToProps)(TrafficPage));
