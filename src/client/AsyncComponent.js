import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        state = { Component: null };

        componentDidMount() {
                importComponent()
                    .then(Component => {
                        this.setState({ Component: Component.default })
                });
            }

        render() {
            const { Component } = this.state
            return Component ? <Component {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}