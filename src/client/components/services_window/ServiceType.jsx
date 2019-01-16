import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleServiceType } from "../redux/actions/servicesAndPodsActions.js";

const ServiceTypeBoxActive = styled.div`
  border: solid;
  border-width: 1px; 
  min-width: 25vh;
  cursor: pointer;
  background-color: #326DE6
  color: white;
`;

const ServiceTypeBoxInActive = styled.div`
  border: solid;
  border-width: 1px;
  width: 98%;
  cursor: pointer;
`;

class ServiceType extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick(e) {
    this.props.toggleServiceType(this.props.type);
  }

  render() {
    if (this.props.activeServiceTypes.includes(this.props.type)) {
      return (
        <ServiceTypeBoxActive onClick={this.handleOnClick.bind(this)}>
          {this.props.type}
        </ServiceTypeBoxActive>
      );
    } else
      return (
        <ServiceTypeBoxInActive onClick={this.handleOnClick.bind(this)}>
          {this.props.type}
        </ServiceTypeBoxInActive>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleServiceType: serviceType => dispatch(toggleServiceType(serviceType))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ServiceType);
