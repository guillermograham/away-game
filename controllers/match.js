const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const rp = require('request-promise');
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
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
}

function indexSavedRoute(req, res, next) {

  Match
    .find()
    .exec()
    .then((matches) => res.json(matches))
    .catch(next);
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
    .populate('screenings')
    .exec()
    .then((match) => {
      if(!match) return res.notFound();

      res.json(match);
    })
    .catch(next);

}

module.exports = {
  index: indexRoute,
  indexSaved: indexSavedRoute,
  new: newRoute,
  show: showRoute
};
