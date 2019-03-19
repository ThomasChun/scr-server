'use strict';

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  { 
    username: { type: String, required: true },
    productName: { type: String, required: true },
    overallRating: { type: Number, required: true },
    valueRating: { type: Number, required: true },
    designRating: { type: Number, required: true },
    excitementRating: { type: Number, required: true },
    checklistRating: { type: Number, required: true },
    recommendProduct: { type: String, required: true },
    youtubeUrl: { type: String },
    userBreakImages: { type: Array },
    hitList: { type: String, required: true },
    userReview: { type: String, required: true },
    approved: {type: Boolean, required: true },
    liked: { type: Array, required: true },
  }
);

reviewSchema.set('timestamps', true);

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, res) => {
    delete res._id;
    delete res.__v;
  }
});

module.exports = mongoose.model('Review', reviewSchema);