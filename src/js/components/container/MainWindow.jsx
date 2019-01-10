import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import HexWindow from './HexWindow.jsx';

class MainWindow extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <HexWindow />
    )
  }
}

export default MainWindow;