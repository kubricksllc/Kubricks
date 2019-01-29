import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleViewMode } from "../redux/actions/windowActions.js";
import { Link } from "react-router-dom";
import { ServiceWindowBox} from '../styled/styledComponents';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

class ViewModes extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.toggleViewMode();
  }

  render() {
    return (
      <div>
        <StyledLink to="/">
          {this.props.viewMode === "Cluster" ? (
            <ServiceWindowBox active>Cluster</ServiceWindowBox>
          ) : (
            <ServiceWindowBox onClick={this.handleOnClick.bind(this)}>
              Cluster
            </ServiceWindowBox>
          )}
        </StyledLink>
        <StyledLink to="/traffic">
          {this.props.viewMode === "Traffic" ? (
            <ServiceWindowBox active>Traffic</ServiceWindowBox>
          ) : (
            <ServiceWindowBox onClick={this.handleOnClick.bind(this)}>
              Traffic
            </ServiceWindowBox>
          )}
        </StyledLink>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    viewMode: state.windowReducer.viewMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleViewMode: serviceType => dispatch(toggleViewMode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewModes);
