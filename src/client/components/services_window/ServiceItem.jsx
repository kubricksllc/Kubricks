import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleService } from "../redux/actions/servicesAndPodsActions.js";
import { ServiceBox } from "../styled/styledComponents";

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
        <ServiceBox active onClick={this.handleOnClick.bind(this)}>
          {this.props.service.name}
        </ServiceBox>
      );
    } else
      return (
        <ServiceBox onClick={this.handleOnClick.bind(this)}>
          {this.props.service.name}
        </ServiceBox>
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
