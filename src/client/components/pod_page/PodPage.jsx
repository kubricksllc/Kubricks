import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { ForceGraph2D } from 'react-force-graph';
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

    render() {
        return (
            <div>
                <h1>I am on pod page</h1>
                {/* <Plot width={1000} height={500} />  */}
                <ForceGraph2D
                    graphData={data}
                    nodeAutoColorBy="group"
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12/globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = node.color;
                        ctx.fillText(label, node.x, node.y);
                    }}
                />
            </div>
        );
    }
}