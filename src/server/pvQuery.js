const api = require('./apiQuery.js');
const Constructor = require('./Constructors.js');

const pvQuery = {
  getPV: (req, res, next) => {
    api
      .getPV()
      .then(result =>
        result.body.items.reduce((listOfPv, pv) => {
          return listOfPv.concat([new Constructor.PVQueryBody(pv)]);
        }, [])
      )
      .then(result => {
        res.set({
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(result));
        next();
      })
      .catch(err => console.log(err));
  }
};

module.exports = pvQuery;
