import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleService } from "../redux/actions/servicesAndPodsActions.js";

const ServiceBoxActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 28vh;
  cursor: pointer;
  background-color: #003366;
  margin-left: 2vh;
  color: white;
`;

const ServiceBoxInActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 28vh;
  margin-left: 2vh;
  cursor: pointer;
`;

class ServiceItem extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick(e) {
    if (
      this.props.activeServiceTypes.includes(
        this.props.listOfServices[this.props.service.index].type
      )
    )
      this.props.toggleService(this.props.service.index);
  }

  render() {
    if (this.props.activeServices.includes(this.props.service.index)) {
      return (
        <ServiceBoxActive onClick={this.handleOnClick.bind(this)}>
          {this.props.service.name}
        </ServiceBoxActive>
      );
    } else
      return (
        <ServiceBoxInActive onClick={this.handleOnClick.bind(this)}>
          {this.props.service.name}
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
)(ServiceItem);
