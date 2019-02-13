'use strict';

const express = require('express');

const users = require('./users');
const auth = require('./auth');

const products = require('./products');

const router = express.Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/products', products);

module.exports = router;