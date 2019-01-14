import React, { Component } from 'react';

export default class PodPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <h1>I am on pod page</h1>
        );
    }
}