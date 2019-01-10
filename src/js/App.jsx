import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ColoredTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

class App extends Component {
  constructor() {
    super();
    this.state= {
      title: 'Hello Kubricks!!!'
    }
  }

  render() {
    return (
      <ColoredTitle>{this.state.title}</ColoredTitle>
    )
  }
}

export default App;