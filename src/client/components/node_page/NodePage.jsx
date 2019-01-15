import React, { Component } from 'react';
import Pod from './Pod.jsx';
import Tree from 'react-d3-tree';
import buildTreeData from './TreeData.js';
import styled from 'styled-components';
import mockData from './mockdata.js'; //delete before push

const TreeWrapper = styled.div `
    name: treeWrapper;
    width: 1000px;
    height: 500px;
    background-color: white;
`

export default class NodePage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <TreeWrapper id='treeWrapper'>
            <Tree data={buildTreeData(mockData.services, mockData.pods, 'gke-kubricks-default-pool-b055752b-wb5z')} />
        </TreeWrapper>
    )
  }
}
