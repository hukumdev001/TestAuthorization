import mongoose, { Schema } from 'mongoose'
import { Comment } from '../@types/Comment'

const CommentSchema = new mongoose.Schema<Comment>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
    comment: String,
    email: String,
    ipAddress: String,
  },
  { timestamps: true }
)

CommentSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.__v
    ret.commentedOn = new Date(ret.createdAt).toDateString()
  },
})

const Comment = mongoose.model<Comment>('Comment', CommentSchema)

module.exports = Comment
