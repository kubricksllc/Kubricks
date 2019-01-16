import React, { Component } from "react";
import { connect } from "react-redux";
import Tree from "react-d3-tree";
import buildTreeData from "./TreeData.jsx";
import styled from "styled-components";
import infoWindow from "../../layout/InfoWindow.js";
import servicesAndPodsFetchData from "../redux/actions/servicesAndPodsActions.js";

const url =
  "http://localhost:8080/api/node/gke-kubricks-default-pool-b055752b-wb5z"; //TODO: delete after testing

const TreeWrapper = styled.div`
  name: treeWrapper;
  width: 1000px;
  height: 1000px;
  background-color: white;
`;

const mapStateToProps = state => {
  return {
    listOfServices: state.servicesReducer.listOfServices,
    listOfPods: state.podsReducer.listOfPods,
    infoWindowOpen: state.windowReducer.infoWindowOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(servicesAndPodsFetchData(url))
  };
};

class NodePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData(url);
  }

  render() {
    const arr = buildTreeData(
      this.props.listOfServices,
      this.props.listOfPods,
      "gke-kubricks-default-pool-b055752b-wb5z"
    );

    if (this.props.listOfServices.length === 0) {
      return <div> waiting to be updated </div>;
    } else {
      return (
        <TreeWrapper id="treeWrapper">
          {/* <Tree
            data={buildTreeData(
              this.props.listOfServices,
              this.props.listOfPods,
              "gke-kubricks-default-pool-b055752b-wb5z"
            )}
            separation={{ siblings: 2, nonSiblings: 2 }}
          /> */}a
          {arr}
        </TreeWrapper>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodePage);
