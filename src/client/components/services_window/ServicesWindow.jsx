import React, { Component } from "react";
import styled from "styled-components";

const Box = styled.div`
  border: solid;
  width: 20%;
  height: 80vh;
`;

class ServicesWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Box>Services</Box>;
  }
}

export default ServicesWindow;
