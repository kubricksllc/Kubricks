import { buildSingleTree, buildNoServiceTree } from './BuildSingleTree.jsx';
import Builder from './Constructors.jsx';

export default function buildTreeData(
  listOfActiveServices,
  listOfServices,
  listOfPodsInStore
) {
  if (listOfServices.length === 0) return [];
  // console.log(listOfActiveServices)

  const blankMasterNode = new Builder.ServiceNode('Master');

  const serviceTree = listOfActiveServices.reduce((acc, serviceIdx) => {
    return acc.concat([
      buildSingleTree(listOfServices[serviceIdx], listOfPodsInStore)
    ]);
  }, []);

  const noServiceTree = buildNoServiceTree(listOfPodsInStore);

  // console.log(blankMasterNode, serviceTree, noServiceTree);

  blankMasterNode.children = serviceTree.concat([noServiceTree]);

  // console.log(blankMasterNode)

  return blankMasterNode;
}