import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCurrentPod } from '../redux/actions/podsActions.js';
import { withRouter } from 'react-router-dom';
import { pvFetchData } from '../redux/actions/pvsActions.js';
import DraggableComp from './DraggableComp.jsx';

//TODO: fix the width and height after hex viewport is implemented!!!!!!!!!!!!!!!!

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

  display(listOfPods) {
    return listOfPods.reduce((display, pod) => {
      console.log(pod);
      if (pod.nodeName === this.props.currentNode) {
        display.push(<DraggableComp name={pod.name} />);
      }
      console.log(display);
      return display;
    }, []);
  }

  // console.log(arr)
  render() {
    return (
      <NodePageContainer>
        {this.display(this.props.listOfPods)}
      </NodePageContainer>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    listOfPods: state.podsReducer.listOfPods,
    currentNode: state.nodesReducer.currentNode,
    listOfPVs: state.pvsReducer.listOfPVs
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
