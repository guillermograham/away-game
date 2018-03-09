const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const rp = require('request-promise');
// const Bar = require('../models/bar');
// const Match = require('../models/match');

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

module.exports = {
  index: indexRoute
};
