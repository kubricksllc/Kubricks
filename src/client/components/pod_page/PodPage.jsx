import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { ForceGraph2D } from 'react-force-graph';
import { connect } from "react-redux";
// import { podsFetch} from '../redux/actions/servicesAndPodsActions.js';
import Plot from './Plot.jsx';

const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: []
};

class PodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfContainers: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        // let tmp = this.props.list
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
                        const fontSize = 12 / globalScale;
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

const mapStateToProps = state => {
    return {
        listOfPods: state.podsReducer.listOfPods,
        currentPod: state.podsReducer.currentPod
    };
};

export default connect(
    mapStateToProps
)(PodPage);