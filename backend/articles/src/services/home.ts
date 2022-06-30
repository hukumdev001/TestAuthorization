import mongoose from 'mongoose'
import { Article } from '../@types/Article'

const Article = mongoose.model('Article')

export const getAll = async () => {
  return await Article.find({ deletedAt: { $eq: null } }).sort({ createdAt: -1 })
}

export const getOne = async ({ slug }: { slug: string }) => {
  try {
    const query: Record<string, unknown> = { slug: { $eq: slug }, deletedAt: { $eq: null } }

    const article = await Article.aggregate([
      {
        $match: {
          slug: { $eq: slug },
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'articleId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'articleId',
          as: 'ratings',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          slug: 1,
          keywords: 1,
          metaKeywords: 1,
          createdAt: 1,
          featured_image: 1,
          comments: 1,
          edited: 1,
          averageRating: { $avg: '$ratings.rating' },
        },
      },
    ])

    if (!article.length) throw { message: 'Article not found' }

    return { article: article[0] }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getPopular = async () => {
  const article = await Article.aggregate([
    {
      $lookup: {
        from: 'ratings',
        localField: '_id',
        foreignField: 'articleId',
        as: 'ratings',
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        slug: 1,
        keywords: 1,
        metaKeywords: 1,
        createdAt: 1,
        featured_image: 1,
        averageRating: { $avg: '$ratings.rating' },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 5 },
  ])
  return article
}
