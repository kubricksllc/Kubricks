function ServiceNode(name = null, type = null, selector = null, ports = null, color = null, serviceIdx = null) {
  this.name = name;
  this.attributes = {
    type,
    selector: JSON.stringify(selector),
    targetPort: ports ? ports[0].targetPort : null,
    listeningPort: ports ? ports[0].port : null
  };
  this.fill = color || 'blue';

  this.otherAttr = {
    serviceIdx: serviceIdx
  };
  
  this.children = []
}

function PodNode(name = null, labels = null, ports = null, podIdx = null, color = null) {
  this.name = name;
  this.attributes = {
    labels: JSON.stringify(labels),
    containerPort: ports[0].containerPort
  };
  this.fill = color || 'red';
  this.shape = 'rect';

  this.otherAttr = {
    podIdx,
  }
}

export default { ServiceNode, PodNode };
