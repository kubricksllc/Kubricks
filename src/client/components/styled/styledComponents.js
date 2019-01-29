import styled from 'styled-components';

export const ServiceWindowBox = styled.div`
  padding: .3em 0 .3em 0;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: ${props => props.active ? '#326de6' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
`