const { checkReadiness, parseContainers, parseStatus, parsePV } = require('./Util.js');

function ClusterQueryBody({ metadata, status }) {
  this.name = metadata.name;
  this.namespace = metadata.namespace;
  this.status = checkReadiness(status.conditions);
  this.createdAt = metadata.creationTimestamp;
  this.version = status.nodeInfo.kubeletVersion;
  this.internalIP = status.addresses[0].address;
  this.externalIP = status.addresses[1].address;
}

function PodQueryBody({ metadata, spec, status }) {
  this.name = metadata.name;
  this.namespace = metadata.namespace;
  this.labels = (() => {
    const keys = Object.keys(metadata.labels);
    return keys.reduce((acc, key) => {
      if (key.indexOf('hash') > -1) {
        return acc;
      } else {
        acc[key] = metadata.labels[key];
      }
      return acc;
    }, {});
  })();
  this.containers = parseContainers(spec.containers);
  this.persistentVolume = parsePV(spec.volumes);
  this.createdAt = metadata.creationTimestamp;
  this.nodeName = spec.nodeName;
  this.status = parseStatus(status);
}

function ServiceQueryBody({ metadata, spec, status }) {
  this.name = metadata.name;
  this.namespace = metadata.namespace;
  this.type = spec.type;
  this.clusterIP = spec.clusterIP;
  this.createdAt = metadata.creationTimestamp;
  this.selector = spec.selector;
  this.ports = spec.ports;
  this.labels = metadata.labels;
  this.status = status.loadBalancer || null;
  this.namespace = metadata.namespace;
}

function PVQueryBody({ metadata, spec, status }) {
  this.name = metadata.name;
  this.createdAt = metadata.creationTimestamp;
  this.labels = metadata.labels;
  this.capacity = spec.capacity;
  this.status = status.phase;
  this.claimName = spec.claimRef.name;
}

module.exports = {
  ClusterQueryBody,
  PodQueryBody,
  ServiceQueryBody,
  PVQueryBody
};
