import mongoose, { Schema } from 'mongoose'
import { ArticleHistory } from '../@types/Article'

const ArticleHistorySchema = new mongoose.Schema<ArticleHistory>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    metaDesc: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    featured_image: {
      type: String,
    },
    deletedAt: {
      default: null,
      type: Date,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Article',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    edited: {
      type: Number,
    },
  },
  { timestamps: true }
)

ArticleHistorySchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.__v
  },
})

const ArticleHistory = mongoose.model<ArticleHistory>('ArticleHistory', ArticleHistorySchema)

module.exports = ArticleHistory
