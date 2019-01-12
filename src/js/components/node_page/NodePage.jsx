import React, { Component } from 'react';

export default class NodePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <h1>I am on node page</h1>
        );
    }
}