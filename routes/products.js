'use strict';

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const Products = require('../models/products');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
router.use(jwtAuth);

router.get('/', jwtAuth, (req, res, next) => {
  Products.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.post('/', jwtAuth, (req, res, next) => {
  let { name, sport, year, releaseDate, brand, productImageUrl, breakdown, description } = req.body;
  const newProduct = { name, sport, year, releaseDate, brand, productImageUrl, breakdown, description };

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  if (!sport) {
    const err = new Error('Missing `sport` in request body');
    err.status = 400;
    return next(err);
  }

  if (!year) {
    const err = new Error('Missing `year` in request body');
    err.status = 400;
    return next(err);
  }

  if (!releaseDate) {
    const err = new Error('Missing `release date` in request body');
    err.status = 400;
    return next(err);
  }
  if (!brand) {
    const err = new Error('Missing `brand` in request body');
    err.status = 400;
    return next(err);
  }

  if (!productImageUrl) {
    const err = new Error('Missing `product image url` in request body');
    err.status = 400;
    return next(err);
  }

  if (!breakdown) {
    const err = new Error('Missing `breakdown` in request body');
    err.status = 400;
    return next(err);
  }

  if (!description) {
    const err = new Error('Missing `description` in request body');
    err.status = 400;
    return next(err);
  }

  Products.create(newProduct)
    .then(result => {
      res.location(`${req.baseUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Products.findOneAndRemove({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router; 