const router = require('express').Router();

const auth = require('../controllers/auth');
const bar = require('../controllers/bar');
const match = require('../controllers/match');
// const user = require('../controllers/user');
// const secureRoute = require('../lib/secureRoute');

router.route('/bars')
  .get(bar.index) // tested
  .post(auth.barRegister); // tested

router.route('/bars/:id')
  .get(bar.show)  // tested
  .put(bar.update); // tested

router.route('/bars/:id/reviews')
  .post(bar.createReview); // tested

router.route('/bars/:id/reviews/:reviewId')
  .delete(bar.deleteReview); // tested

router.route('/matches')
  .get(match.index) // matches
  .post(match.new);

router.route('/matches/:matchCode')
  .get(match.show);

router.route('/register')
  .post(auth.userRegister); // tested

router.route('/login')
  .post(auth.userLogin); // tested

router.route('/barlogin')
  .post(auth.barLogin); // tested

router.all('/*', (req, res) => res.notFound());

module.exports = router;
