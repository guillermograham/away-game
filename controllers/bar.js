const Bar = require('../models/bar');

function indexRoute(req, res, next) {
  Bar
    .find()
    .exec()
    .then((bars) => res.json(bars))
    .catch(next);
}

function showRoute(req, res, next) {
  Bar
    .findById(req.params.id)
    .populate('fixtures')
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      res.json(bar);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Bar
    .findById(req.params.id)
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      Object.assign(bar, req.body);
      return bar.save();
    })
    .then((bar) => res.json(bar))
    .catch(next);
}

function createReviewRoute(req, res, next) {

  req.body.createdBy = req.user;

  Bar
    .findById(req.params.id)
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      const review = bar.reviews.create(req.body);
      bar.reviews.push(review);

      return bar.save()
        .then(() => res.json(review));
    })
    .catch(next);
}

function deleteReviewRoute(req, res, next) {
  Bar
    .findById(req.params.id)
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      const review = bar.reviews.id(req.params.reviewId);
      review.remove();

      return bar.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addScreeningRoute(req, res, next) {
  Bar
    .findById(req.body.bar._id)
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      // check if fixture is already in bar' - indexOf returns -1 if it is not there
      if (bar.fixtures.indexOf(req.body.match._id) > -1) {
        // removing of the id
        const index = bar.fixtures.indexOf(req.body.match._id);
        bar.fixtures.splice(index, 1);
      } else {
        // push the id in to the bar.fixtures
        bar.fixtures.push(req.body.match._id);
      }

      return bar.save();
    })
    .then((bar) => res.json(bar))
    .catch(next);
}

function getBarInfoRoute (req, res, next) {
  Bar
    .findById(req.params.id)
    .exec()
    .then((bar) => {
      if(!bar) return res.notFound();

      res.json(bar);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  createReview: createReviewRoute,
  deleteReview: deleteReviewRoute,
  addScreening: addScreeningRoute,
  getBarInfo: getBarInfoRoute
};
