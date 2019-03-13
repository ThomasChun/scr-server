'use strict';

const express = require('express');
const passport = require('passport');

const Review = require('../models/review');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
router.use(jwtAuth);

router.get('/', jwtAuth, (req, res, next) => {
  Review.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.post('/', jwtAuth, (req, res, next) => {
  let { username, productName, overallRating, valueRating, designRating, excitementRating, checklistRating, recommendProduct, youtubeUrl, userBreakImages, hitList, userReview } = req.body;
  const newReview = { username, productName, overallRating, valueRating, designRating, excitementRating, checklistRating, recommendProduct, youtubeUrl, userBreakImages, hitList, userReview };

  if (!username) {
    const err = new Error('Missing `username` in request body');
    err.status = 400;
    return next(err);
  }

  if (!productName) {
    const err = new Error('Missing `product name` in request body');
    err.status = 400;
    return next(err);
  }

  if (!overallRating) {
    const err = new Error('Missing `overall rating` in request body');
    err.status = 400;
    return next(err);
  }

  if (!valueRating) {
    const err = new Error('Missing `value rating` in request body');
    err.status = 400;
    return next(err);
  }

  if (!designRating) {
    const err = new Error('Missing `design rating` in request body');
    err.status = 400;
    return next(err);
  }

  if (!excitementRating) {
    const err = new Error('Missing `excitement rating` in request body');
    err.status = 400;
    return next(err);
  }

  if (!checklistRating) {
    const err = new Error('Missing `checklist rating` in request body');
    err.status = 400;
    return next(err);
  }

  if (!recommendProduct) {
    const err = new Error('Missing `recommend product` in request body');
    err.status = 400;
    return next(err);
  }

  if (!youtubeUrl) {
    const err = new Error('Missing `youtube url` in request body');
    err.status = 400;
    return next(err);
  }

  if (!hitList) {
    const err = new Error('Missing `hit list` in request body');
    err.status = 400;
    return next(err);
  }

  if (!userReview) {
    const err = new Error('Missing `user review` in request body');
    err.status = 400;
    return next(err);
  }

  Review.create(newReview)
    .then(result => {
      res.location(`${req.baseUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

module.exports = router;