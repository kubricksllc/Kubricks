import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCurrentPod } from '../redux/actions/podsActions.js';
import { withRouter } from 'react-router-dom';
import { pvFetchData } from '../redux/actions/pvsActions.js';
import { displayPodInfo, hidePodInfo, displayPVInfo, hidePVInfo } from '../redux/actions/windowActions.js';
import buildData from './BuildData.js';
import Tree from 'react-d3-tree';
import classes from './PodPVClass.js';

const NodePageContainer = styled.div`
  width: 97%;
  height: 97%;
`;

class NodePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = '/api/pv/';
    this.props.fetchPVs(url);
  }

  handleMouseOver(nodeObj) {
    if(nodeObj instanceof classes.Pod) {
      this.props.displayPodInfo(nodeObj.otherAttr.podIdx);
    } else if(nodeObj instanceof classes.PV) {
      this.props.displayPVInfo(nodeObj.otherAttr.pvIdx);
    }
  }

  render() {
    return (
      <NodePageContainer>
        <Tree
          data={buildData(
            this.props.listOfPods,
            this.props.listOfPVs,
            this.props.activeServices,
            this.props.listOfServices,
            this.props.currentNode.name
          )}
          separation={{ siblings: 1, nonSiblings: 5 }}
          onMouseOver={(nodeObj) => { this.handleMouseOver(nodeObj); }}
          translate={{x: 150, y: 150}}
          textLayout={{textAnchor: 'start', x: 0, y: -20}}
        />
      </NodePageContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    listOfPods: state.podsReducer.listOfPods,
    currentNode: state.nodesReducer.currentNode,
    listOfPVs: state.pvsReducer.listOfPVs,
    activeServices: state.servicesReducer.activeServices,
    listOfServices: state.servicesReducer.listOfServices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
    displayPodInfo: (podIndex) => 
      dispatch(displayPodInfo(podIndex)),
    hidePodInfo: (podIndex) => dispatch(hidePodInfo(podIndex)),
    displayPVInfo: (pvIndex) => dispatch(displayPVInfo(pvIndex)),
    hidePVInfo: (pvIndex) => dispatch(hidePVInfo(pvIndex)),
    updateCurrentPod: podObj => dispatch(updateCurrentPod(podObj)),
    updateCurrentService: serviceObj =>
      dispatch(updateCurrentService(serviceObj)),
    fetchPVs: url => dispatch(pvFetchData(url))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NodePage)
);
