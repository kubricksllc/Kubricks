import { buildSingleTree, buildNoServiceTree } from './BuildSingleTree.jsx';
import Builder from './Constructors.jsx';

function buildTree(
  listOfActiveServices,
  listOfServices,
  listOfPodsInStore,
  nodeName
) {
  if (listOfServices.length === 0) return [];
  // console.log(listOfActiveServices)

  const blankMasterNode = new Builder.ServiceNode('Master');

  const serviceTree = listOfActiveServices.reduce((acc, serviceIdx) => {
    return acc.concat([
      buildSingleTree(listOfServices[serviceIdx], listOfPodsInStore, nodeName)
    ]);
  }, []);

  const noServiceTree = buildNoServiceTree(listOfPodsInStore, nodeName);

  // console.log(blankMasterNode, serviceTree, noServiceTree);

  blankMasterNode.children = serviceTree.concat([noServiceTree]);

  // console.log(blankMasterNode)

  return blankMasterNode;
}

export default buildTree;
