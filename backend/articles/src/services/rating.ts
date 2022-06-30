import mongoose from 'mongoose'
import { Rating } from '../@types/Rating'

const Rating = mongoose.model('Rating')

export const create = async (rating: Rating) => {
  try {
    const previousRating = await Rating.findOne({
      $and: [{ email: { $eq: rating.email } }, { articleId: { $eq: rating.articleId } }],
    })
    if (previousRating) return
    return await Rating.create(rating)
  } catch (err) {
    console.error(err)
    throw err
  }
}
