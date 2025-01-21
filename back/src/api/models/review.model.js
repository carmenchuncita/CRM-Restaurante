const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviwer: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: Text, required: true },
  },
  {
    collection: 'reviews',
    timestamps: true, 
  }
);

const Reviews = mongoose.model('reviews', reviewSchema);
module.exports = Reviews;