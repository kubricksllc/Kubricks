import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import MainWindow from './components/container/MainWindow.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MainWindow />
    )
  }
}

export default App;