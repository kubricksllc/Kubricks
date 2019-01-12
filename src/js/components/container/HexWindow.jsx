import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import HexTitle from '../presentational/HexTitle.jsx';

class HexWindow extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Cluster'
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <HexTitle title={this.state.title} />

    )
  }
}

export default HexWindow;