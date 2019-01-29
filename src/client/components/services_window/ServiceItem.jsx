import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleService } from "../redux/actions/servicesAndPodsActions.js";
import { ServiceWindowBox } from '../styled/styledComponents';

class ServiceList extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick(e) {
    if (
      this.props.activeServiceTypes.includes(
        this.props.listOfServices[this.props.index].type
      )
    )
      this.props.toggleService(this.props.index);
  }

  render() {
    if (this.props.activeServices.includes(this.props.index)) {
      return (
        <ServiceWindowBox active onClick={this.handleOnClick.bind(this)}>
          {this.props.name}
        </ServiceWindowBox>
      );
    } else
      return (
        <ServiceWindowBox onClick={this.handleOnClick.bind(this)}>
          {this.props.name}
        </ServiceWindowBox>
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
