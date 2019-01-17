import React, { Component } from 'react';

export default class Node extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.d3Node = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(enterNode);
    }

    componentDidUpdate() {
        this.d3Node.datum(this.props.data)
            .call(updateNode);
    }

    render() {
        return (
            <g className='node'>
                <circle/>
                <text>{this.props.data.key}</text>
            </g>
        );
    }
}