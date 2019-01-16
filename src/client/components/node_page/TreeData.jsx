import { buildSingleTree } from "./BuildSingleTree.jsx";
import Tree from "react-d3-tree";
import React from "react";
import styled from "styled-components";
import InfoWindow from "../../layout/InfoWindow.jsx";

const TreeWrapper = styled.div`
  name: treeWrapper;
  width: 100%;
  height: 100%;
  background-color: #e1fcf8;
`;

function checkNodeType (node, e, updateCurrentPod, updateCurrentService) {
  // console.log(node)
  if(node.otherAttr.podIdx) {
    // console.log(updateCurrentPod);
    // console.log(node)
    updateCurrentPod(node.otherAttr.podIdx)
  } else {
    console.log(node)
  }
}

function buildTree(
  listOfActiveServices,
  listOfServices,
  listOfPodsInStore,
  nodeName,
  updateCurrentPod,
  updateCurrentService
) {
  if (listOfServices.length === 0) return [];
  console.log(listOfActiveServices)

  return listOfActiveServices.reduce((acc, serviceIdx) => {
    const temp = (
      <TreeWrapper class="treewrapper">
        <Tree
          data={buildSingleTree(
            listOfServices[serviceIdx],
            listOfPodsInStore,
            nodeName
          )}
          onMouseOver={(node, e) => {
            console.log(e.clientX, e.clientY)
            checkNodeType(node, e, updateCurrentPod, updateCurrentService);
            <InfoWindow />
          }}
        />
      </TreeWrapper>
    );
    return acc.concat([temp]);
  }, []);
}

export default buildTree;
