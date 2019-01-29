function Pod(name, podIdx, color) {
  this.name = name;
  this.nodeSvgShape = {
    shape: 'rect',
    shapeProps: {
      fill: color,
      width: '2%',
      height: '2%',
      x: '-1%',
      y: '-1%'
    }
  };

  this.otherAttr = {
    podIdx
  };

  this.children = [];
}

function PV(name, pvIdx) {
  this.name = name;

  this.otherAttr = {
    pvIdx
  };
}

export default { Pod, PV };
