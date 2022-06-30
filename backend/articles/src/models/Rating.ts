import mongoose, { Schema } from 'mongoose'
import { Rating } from '../@types/Rating'

const RatingSchema = new mongoose.Schema<Rating>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
    rating: Number,
    email: String,
    ipAddress: String,
  },
  { timestamps: true }
)

RatingSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.__v
  },
})

const Rating = mongoose.model<Rating>('Rating', RatingSchema)

module.exports = Rating
