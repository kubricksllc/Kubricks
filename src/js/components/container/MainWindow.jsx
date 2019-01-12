import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import HexWindow from './HexWindow.jsx';

class MainWindow extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch('http://localhost:3000/posts/1')
    .then(response => response.json())
    .then(json => console.log(json));
  }

  render() {
    console.log(this.props);
    return (
      <HexWindow />
    )
  }
}

export default MainWindow;