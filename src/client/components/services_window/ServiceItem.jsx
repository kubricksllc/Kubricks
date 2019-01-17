import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleService } from "../redux/actions/servicesAndPodsActions.js";

const ServiceBoxActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 25vh;
  cursor: pointer;
  background-color: #326DE6;
  color: white;
`;

const ServiceBoxInActive = styled.div`
  border: 1px solid;
  border-radius: 5px;
  min-width: 25vh;
  cursor: pointer;
`;

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
