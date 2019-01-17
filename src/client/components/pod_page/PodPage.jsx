import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { ForceGraph2D } from 'react-force-graph';
import { connect } from "react-redux";
import { servicesAndPodsFetchData } from "../redux/actions/servicesAndPodsActions.js";
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

    componentWillReceiveProps(reduxProps) {
        let index = 0;
        let tmp = [];
        if(reduxProps.listOfPods.length > 0) {
            tmp = reduxProps.listOfPods[index].containers.slice();
            for(let i=0; i<tmp.length; i++) {
                tmp[i]['id'] = reduxProps.listOfPods[index].name + "_" + i;
            }
            console.log(tmp);
            this.setState({
                listOfContainers: tmp
            });
        }
    }

    componentDidMount() {
        const url =
        "http://localhost:8080/api/node/gke-kubricks-default-pool-b055752b-wb5z"; //TODO: delete after testing
        this.props.fetchData(url);
        // let tmp = this.props.listOfPods[0].listOfContainers.slice() || [];
        // console.log(tmp);

        // this.setState({
        //     listOfContainers: this.props.listOfPods[0].listOfContainers
        // });
        // console.log(this.props);
        // let index = 0;
        // let tmp = [];
        // if(this.props.listOfPods.length > 0) {
        //     tmp = this.props.listOfPods[index].containers.slice();
        //     for(let i=0; i<tmp.length; i++) {
        //         tmp[i]['id'] = this.props.listOfPods[index].name + "_" + i;
        //     }
        //     console.log(this.props.listOfPods[index]);
        // }
    }

    renderContainers() {

    }

    render() {
        const dataPoints = {
            nodes: this.state.listOfContainers,
            links: []
        };
        return (
            <div>
                <h1>I am on pod page</h1>
                {/* <Plot width={1000} height={500} />  */}
                <ForceGraph2D
                    graphData={dataPoints}
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
                    width={500}
                    height={300}
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

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(servicesAndPodsFetchData(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PodPage);