import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import toggleServiceType from "../redux/actions/servicesAndPodsActions.js";

const ServiceTypeBox = styled.div`
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
    this.props.toggleServiceType(this.props.serviceType);
  }

  render() {
    return (
      <ServiceTypeBox onClick={this.handleOnClick.bind(this)}>
        {this.props.type}
      </ServiceTypeBox>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: serviceType => dispatch(toggleServiceType(serviceType))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ServiceType);
