function ServiceNode(name = null, type = null, selector = null, ports = null) {
  this.name = name;
  this.attributes = {
    type,
    selector: JSON.stringify(selector),
    targetPort: ports ? ports[0].targetPort : null,
    listeningPort: ports ? ports[0].port : null
  };
  this.nodeSvgShape = {
    shape: 'circle',
    shapeProps: {
      r: 10,
      cx: -3,
      cy: -3,
      fill: 'blue'
    }
  };
  this.otherAttr = {
    serviceIdx: null
  };
  
  this.children = []
}

function PodNode(name = null, labels = null, ports = null, podIdx = null) {
  this.name = name;
  this.attributes = {
    labels: JSON.stringify(labels),
    containerPort: ports[0].containerPort
  };
  this.nodeSvgShape = {
    shape: 'rect',
    shapeProps: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
      fill: 'green'
    }
  };
  this.otherAttr = {
    podIdx,
  }
}

export default { ServiceNode, PodNode };
