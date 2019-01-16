function ServiceNode(name, type, selector, ports) {
  this.name = name;
  this.attributes = {
    type,
    selector: JSON.stringify(selector),
    targetPort: ports[0].targetPort,
    listeningPort: ports[0].port,
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
  this.children = []
}

function PodNode(name, labels, ports) {
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
}

export default { ServiceNode, PodNode };
