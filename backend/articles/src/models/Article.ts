import mongoose, { Schema } from 'mongoose'
import { Article } from '../@types/Article'

const ArticleSchema = new mongoose.Schema<Article>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    authorName: {
      type: String,
    },
    featured_image: {
      type: String,
    },
    deletedAt: {
      default: null,
      type: Date,
    },
    deletedBy: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
    },
    edited: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

ArticleSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.__v
    ret.publishedOn = new Date(ret.createdAt).toDateString()
  },
})

const Article = mongoose.model<Article>('Article', ArticleSchema)

module.exports = Article
