const { ServiceQueryBody, PodQueryBody } = require('./Constructors.js');
const api = require('./apiQuery');

const nodeQuery = {
  getServicesAndPods: (req, res, next) => {
    console.log(res);
    Promise.all([api.getAllServices(), api.getAllPods()])
      .then(result => {
        const services = result[0].body.items.reduce(
          (listOfServices, service) => {
            if (service.metadata.name === 'kubernetes') {
              return listOfServices;
            }
            return listOfServices.concat([new ServiceQueryBody(service)]);
          },
          []
        );
        const pods = result[1].body.items.reduce(
          (listOfPods, pod) => listOfPods.concat([new PodQueryBody(pod)]),
          []
        );
        return { services, pods };
      })
      .then(result => {
        res.set({
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(result));
        next();
      })
      .catch(err => {
        console.log('node query error', err);
        res.status(400);
        res.write(
          JSON.stringify(`failed to query Kubernetes API, possible reasons: 
        unauthorized access, please refresh your token with your cloud provider
        if you are using minikube, please run minikube start`)
        );
        next();
      });
  }
};

// nodeQuery.getServicesAndPods();

module.exports = nodeQuery;
