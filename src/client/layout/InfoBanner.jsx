import React, { Component } from 'react';
import styled from 'styled-components';

const Banner = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
const InfoBox = styled.div`
  border: 2px solid;
  padding-left: 1em;
  padding-right: 1em;
  margin-left: .4em;
  margin-top: 1em;
`

const Title = styled.h3`
  margin-bottom: 0;
`

const Details = styled.p`
  margin: 0;
`

class InfoBanner extends Component {
  render() {
    return (
      <Banner>
        <Title>gke-kubricks-b055752b-7nsz</Title>
        <InfoBox>
          <Details>Port: 1338</Details>
          <Details>IP: 10.24.1.8</Details>
        </InfoBox>
      </Banner>
    )
  }
}

export default InfoBanner;