import mongoose from 'mongoose'
import { Comment } from '../@types/Comment'

const Comment = mongoose.model('Comment')

export const create = async (comment: Comment) => {
  try {
    return await Comment.create(comment)
  } catch (err) {
    console.error(err)
    throw err
  }
}
