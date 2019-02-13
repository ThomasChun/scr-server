'use strict';

const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    year: { type: String, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    productImageUrl: { type: String, required: true },
    breakdown: { type: String, required: true },
    description: { type: String, required: true },
  }
);

productsSchema.set('timestamps', true);

productsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, res) => {
    delete res._id;
    delete res.__v;
  }
});

module.exports = mongoose.model('Products', productsSchema);