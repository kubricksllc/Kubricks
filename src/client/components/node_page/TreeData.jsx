import Builder from './Constructors.jsx';
import Tree from "react-d3-tree";
import React from 'react';
import styled from "styled-components";


// function buildTree(listOfServices, listOfPodsInStore, nodeName) {
//   if(listOfServices.length === 0) return [];
//   const nodeTree = [];
//   const children = [];

//   listOfServices.forEach(service => {
//     if(service.type === 'LoadBalancer' || service.type === 'Ingress' ) {
//       const serviceNode = new Builder.ServiceNode(service.name, service.type, null, service.ports)
//       nodeTree.push(serviceNode);
//     } else {
//       children.push(buildSingleTree(service, listOfPodsInStore, nodeName))
//     }
//   });
//   // console.log(nodeTree);
//   nodeTree[0].children = children;
  
//   return nodeTree;
// }

const TreeWrapper = styled.div`
  name: treeWrapper;
  width: 1000px;
  height: 1000px;
  background-color: white;
`;

function buildTree(listOfServices, listOfPodsInStore, nodeName) {
  if(listOfServices.length === 0) return [];

  const array = [];

  for (let i = 0; i < listOfServices.length; i++) {
    if(listOfServices[i].type === 'LoadBalancer' || listOfServices[i].type === 'Ingress') {
      continue;
    } else {
      const item = <TreeWrapper id='treeWrapper'> 
      <Tree data={buildSingleTree(listOfServices[i], listOfPodsInStore, nodeName)} />
      </TreeWrapper>
      array.push(item);
    }
  }
  return array;
}

function buildSingleTree(service, listOfPodsInStore, nodeName) {
  const serviceNode = new Builder.ServiceNode(service.name, service.type, service.selector, service.ports)

  let key = null;
  if (service.selector) { 
    key = Object.keys(service.selector)[0];
  }

  listOfPodsInStore.forEach(pod => {
    if (key &&
      pod.labels[key] === service.selector[key] &&
      pod.nodeName === nodeName
    ) {
      const podNode = new Builder.PodNode(pod.name, pod.labels, pod.containers[0].mappedContainerPort)
      serviceNode.children.push(podNode);
    }
  });

  return serviceNode;
}

export default buildTree;
