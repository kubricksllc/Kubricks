import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { servicesAndPodsFetchData } from "../redux/actions/servicesAndPodsActions.js";
import ServiceType from "./ServiceType.jsx";
import ServiceItem from "./ServiceItem.jsx";

const Box = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0px 5px 28px 1px #d9d9d9;
  width: 30vw;
  height: 80vh;
  padding: 1em;
  margin-left: .5em;
  margin-right: 1em;
`;

const Title = styled.h1`
  text-align: center;
`;

const ServiceTypes = styled.div`
  text-align: center;
`;

const Services = styled.div`
  text-align: center;
`;

class ServicesWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url =
      "http://localhost:8080/api/node/gke-kubricks-default-pool-b055752b-wb5z"; //TODO: delete after testing
    this.props.fetchData(url);
  }

  renderServiceTypes() {
    return this.props.serviceTypes.map(serviceType => (
      <ServiceType
        key={serviceType}
        type={serviceType}
        activeServiceTypes={this.props.activeServiceTypes}
      />
    ));
  }

  renderServiceList() {
    let i = 0;
    return this.props.listOfServices.map(service => (
      <ServiceItem
        key={service.name}
        name={service.name}
        index = {i++}
        listOfServices={this.props.listOfServices}
        activeServices={this.props.activeServices}
        activeServiceTypes={this.props.activeServiceTypes}
      />
    ));
  }

  render() {
    return (
      <Box>
        <Title>Services</Title>
        Service Types
        <ServiceTypes>{this.renderServiceTypes()}</ServiceTypes>
        Services
        <Services>{this.renderServiceList()}</Services>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(servicesAndPodsFetchData(url))
  };
};

const mapStateToProps = state => {
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    activeServiceTypes: state.servicesReducer.activeServiceTypes,
    serviceTypes: state.servicesReducer.serviceTypes
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesWindow);
