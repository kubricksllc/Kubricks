import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleServiceType } from "../redux/actions/servicesAndPodsActions.js";
import ServiceItem from "./ServiceItem.jsx";
import {ServiceWindowBox} from "../styled/styledComponents.js";

const ServiceList = styled.div``;

class ServiceType extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick(e) {
    this.props.toggleServiceType(this.props.type);
  }

  renderServiceList() {
    return this.props.listOfServices.map(service => {
      if (this.props.type === service.type)
        return (
          <ServiceItem
            key={service.name}
            service={service}
            listOfServices={this.props.listOfServices}
            activeServices={this.props.activeServices}
            activeServiceTypes={this.props.activeServiceTypes}
          />
        );
    });
  }

  render() {
    if (this.props.activeServiceTypes.includes(this.props.type)) {
      return (
        <ServiceList>
          <ServiceWindowBox active onClick={this.handleOnClick.bind(this)}>
            {this.props.type}
          </ServiceWindowBox>
          {this.renderServiceList()}
        </ServiceList>
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
