const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const rp = require('request-promise');
// const Bar = require('../models/bar');
const Match = require('../models/match');

function indexRoute(req, res) {
  rp({
    url: 'http://api.football-data.org/v1/competitions/445/fixtures',
    method: 'GET',
    json: true,
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
    }
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
}

function newRoute(req, res, next) {

  Match
    .create(req.body)
    .then((match) => res.json(match))
    .catch(next);
}

function showRoute(req, res, next) {

  Match
    .findOne({ matchCode: req.params.matchCode })
    .exec()
    .then((match) => {
      if(!match) return res.notFound();

      res.json(match);
    })
    .catch(next);

}

module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute
};
