import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state= {
      title: 'Hello Kubricks!'
    }
  }

  render() {
    return (
      <h1>{this.state.title}</h1>
    )
  }
}

export default App;