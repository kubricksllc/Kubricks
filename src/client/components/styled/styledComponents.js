import styled from 'styled-components';

export const ServiceWindowBox = styled.div`
  padding: .3em 0 .3em 0;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
  width: 95%;
  margin-top: 2px;
  cursor: pointer;
  background-color: ${props => props.active ? '#326de6' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
`
export const ServiceBox = styled(ServiceWindowBox)`
  margin-top: 0;
  margin-left: 5%;
  width: 95%;
  background-color: ${props => props.active ? 'darkblue' : 'white'};
`