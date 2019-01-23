import React, { Component } from 'react';
import styled from 'styled-components';

const InfoTitle = styled.h1`
  text-decoration: underline;
`

class InfoPane extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <InfoTitle>Info Window</InfoTitle>
    )
  }
}

export default InfoPane;