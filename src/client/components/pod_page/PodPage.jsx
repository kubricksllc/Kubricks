import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import Plot from './Plot.jsx';

const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};

const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

export default class PodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPods: []
        };
    }

    componentDidMount() {
        
    }

    onClickGraph() {
        window.alert(`Clicked the graph background`);
    }

    onClickNode(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    }

    onRightClickNode(event, nodeId) {
        window.alert(`Right clicked node ${nodeId}`);
    }

    onMouseOverNode(nodeId) {
        window.alert(`Mouse over node ${nodeId}`);
    }

    onMouseOutNode(nodeId) {
        window.alert(`Mouse out node ${nodeId}`);
    }

    onClickLink(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    }

    onRightClickLink(event, source, target) {
        window.alert(`Right clicked link between ${source} and ${target}`);
    }

    onMouseOverLink(source, target) {
        window.alert(`Mouse over in link between ${source} and ${target}`);
    }

    onMouseOutLink(source, target) {
        window.alert(`Mouse out link between ${source} and ${target}`);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>I am on pod page</h1>
                {/* <Plot width={1000} height={500} /> */}
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    onClickNode={this.onClickNode}
                    onRightClickNode={this.onRightClickNode}
                    onClickGraph={this.onClickGraph}
                    onClickLink={this.onClickLink}
                    onRightClickLink={this.onRightClickLink}
                    onMouseOverNode={this.onMouseOverNode}
                    onMouseOutNode={this.onMouseOutNode}
                    onMouseOverLink={this.onMouseOverLink}
                    onMouseOutLink={this.onMouseOutLink}
                />
            </div>
        );
    }
}