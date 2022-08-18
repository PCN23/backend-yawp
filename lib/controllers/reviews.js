const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');
const authorizeReview = require('../middleware/authorizeReview');

module.exports = Router().delete('/:id', authenticate, authorizeReview, async (req, res, next) => {
  try {
    const data = await Review.delete(req.params.id);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
