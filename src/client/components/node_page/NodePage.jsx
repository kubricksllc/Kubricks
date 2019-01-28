import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCurrentPod } from '../redux/actions/podsActions.js';
import { withRouter } from 'react-router-dom';
import { pvFetchData } from '../redux/actions/pvsActions.js';
import buildData from './BuildData.jsx';
import Tree from 'react-d3-tree';

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

  // console.log(arr)
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
          translate={{x: 50, y: 50}}
        />
      </NodePageContainer>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
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
    updateCurrentPod: podIdx => dispatch(updateCurrentPod(podIdx)),
    updateCurrentService: serviceIdx =>
      dispatch(updateCurrentService(serviceIdx)),
    fetchPVs: url => dispatch(pvFetchData(url))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NodePage)
);
