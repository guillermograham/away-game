const Bar = require('../models/bar');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function userRegister(req, res, next) {

  req.body.type = 'User';

  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next);
}

function userLogin(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id, type: user.type }, secret, { expiresIn: '1hr' });
      return res.json({ token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

function barRegister(req, res, next) {
  Bar
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next);
}

function barLogin(req, res, next) {
  Bar
    .findOne({ email: req.body.email })
    .then((bar) => {
      if(!bar || !bar.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ barId: bar.id }, secret, { expiresIn: '1hr' });
      return res.json({ token, bar });
    })
    .catch(next);
}

module.exports = {
  userRegister,
  userLogin,
  barRegister,
  barLogin
};
