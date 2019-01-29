import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleServiceType } from "../redux/actions/servicesAndPodsActions.js";
import ServiceItem from "./ServiceItem.jsx";

const ServiceTypeBoxActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 25vh;
  cursor: pointer;
  background-color: #326de6;
  color: white;
  margin-top: 1vh;
`;

const ServiceTypeBoxInActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 25vh;
  cursor: pointer;
  margin-top: 1vh;
`;

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
          <ServiceTypeBoxActive onClick={this.handleOnClick.bind(this)}>
            {this.props.type}
          </ServiceTypeBoxActive>
          {this.renderServiceList()}
        </ServiceList>
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
