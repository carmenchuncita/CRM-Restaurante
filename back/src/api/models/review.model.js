const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviwer: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    collection: 'reviews',
    timestamps: true, 
  }
);

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;