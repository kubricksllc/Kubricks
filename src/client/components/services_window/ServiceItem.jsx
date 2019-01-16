import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleService } from "../redux/actions/servicesAndPodsActions.js";

const ServiceBoxActive = styled.div`
  border: solid;
  border-width: 1px; 
  min-width: 25vh;
  max-width: 30vh;
  cursor: pointer;
  background-color: #326DE6
  color: white;
`;

const ServiceBoxInActive = styled.div`
  border: solid;
  border-width: 1px;
  width: 98%;
  cursor: pointer;
`;

class ServiceList extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick(e) {
    this.props.toggleService(this.props.index);
  }

  render() {
    if (this.props.activeServices.includes(this.props.index)) {
      return (
        <ServiceBoxActive onClick={this.handleOnClick.bind(this)}>
          {this.props.name}
        </ServiceBoxActive>
      );
    } else
      return (
        <ServiceBoxInActive onClick={this.handleOnClick.bind(this)}>
          {this.props.name}
        </ServiceBoxInActive>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleService: serviceIndex => dispatch(toggleService(serviceIndex))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ServiceList);
