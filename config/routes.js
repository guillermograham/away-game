const router = require('express').Router();

const auth = require('../controllers/auth');
const bar = require('../controllers/bar');
const match = require('../controllers/match');
// const user = require('../controllers/user');
// const secureRoute = require('../lib/secureRoute');

router.route('/bars')
  .get(bar.index)
  .post(auth.barRegister);

router.route('/bars/:id')
  .get(bar.show)
  .put(bar.update);

router.route('/bars/:id/reviews')
  .post(bar.createReview);

router.route('/bars/:id/reviews/:reviewId')
  .delete(bar.deleteReview);

router.route('/matches')
  .get(match.index);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
