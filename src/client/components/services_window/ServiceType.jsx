import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleServiceType } from "../redux/actions/servicesAndPodsActions.js";
import { ServiceWindowBox } from '../styled/styledComponents';

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
        <ServiceWindowBox active onClick={this.handleOnClick.bind(this)}>
          {this.props.type}
        </ServiceWindowBox>
      );
    } else
      return (
        <ServiceWindowBox onClick={this.handleOnClick.bind(this)}>
          {this.props.type}
        </ServiceWindowBox>
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
