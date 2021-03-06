import { buildSingleTree, buildNoServiceTree } from './BuildSingleTree.js';
import Builder from './PodNodeSvcNodeClass.js';

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
      buildSingleTree(listOfServices[serviceIdx], listOfPodsInStore, serviceIdx)
    ]);
  }, []);

  const noServiceTree = buildNoServiceTree(listOfPodsInStore);

  blankMasterNode.children = serviceTree.concat([noServiceTree]);

  return blankMasterNode;
}
