import mongoose from 'mongoose'
import { Article, ArticleHistory } from '../@types/Article'

const Article = mongoose.model('Article')
const ArticleHistory = mongoose.model('ArticleHistory')

interface UserRole {
  isAdmin: boolean
  isPublisher: boolean
  userId: string | null
}

export const create = async (article: Article) => {
  try {
    const newArticle = await Article.create(article)
    return newArticle
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const update = async (article: Article, articleId: string, updatedBy: string | null) => {
  try {
    // find the article
    const foundArticle: Article | null = await Article.findOne({
      _id: { $eq: articleId },
      deletedAt: { $eq: null },
    })
    if (!foundArticle) {
      throw { message: 'Article not found' }
    }

    // copy it to ArticleHistory
    await ArticleHistory.create({
      title: foundArticle.title,
      description: foundArticle.description,
      slug: foundArticle.slug,
      keywords: foundArticle.keywords,
      metaDesc: foundArticle.metaDesc,
      articleId: articleId,
      updatedBy: updatedBy,
      deletedAt: foundArticle.deletedAt,
      createdBy: foundArticle.createdBy,
      edited: foundArticle.edited,
    })

    article.edited = foundArticle.edited ? foundArticle.edited + 1 : 1

    //update the article
    const updatedArticle = Article.updateOne(
      { _id: { $eq: articleId } },
      { $set: article },
      { new: true }
    ).exec()

    return updatedArticle
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getAll = async (userRole: UserRole) => {
  if (userRole.isAdmin) {
    return await Article.find({ deletedAt: { $eq: null } }).sort({ createdAt: -1 })
  }
  return await Article.find({ deletedAt: { $eq: null }, createdBy: { $eq: userRole.userId } }).sort(
    { createdAt: -1 }
  )
}

export const getOne = async ({ slug, userRole }: { slug: string; userRole: UserRole }) => {
  try {
    let query: Record<string, unknown> = { slug: { $eq: slug }, deletedAt: { $eq: null } }

    if (!userRole.isAdmin) {
      query = { slug: { $eq: slug }, deletedAt: { $eq: null }, createdBy: { $eq: userRole.userId } }
    }

    const article = await Article.findOne(query)
    if (!article) {
      throw { message: ' article not found' }
    }
    const articleHistories = await ArticleHistory.find({ articleId: { $eq: article.id } }).sort({
      createdAt: -1,
    })

    return { article, articleHistories }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const destroy = async (
  { articleId, userRole }: { articleId: string; userRole: UserRole },
  deletedBy: string | null
) => {
  if (userRole.isAdmin) {
    return Article.updateOne(
      { _id: { $eq: articleId } },
      { $set: { deletedAt: new Date(), deletedBy: deletedBy, edited: 1 } }
    ).exec()
  }
  return Article.updateOne(
    { _id: { $eq: articleId }, createdBy: { $eq: userRole.userId } },
    { $set: { deletedAt: new Date(), deletedBy: deletedBy, edited: 1 } }
  ).exec()
}

export const restoreHistory = async (articleId: string, historyId: string) => {
  try {
    const history = await ArticleHistory.findOne<ArticleHistory>({ _id: { $eq: historyId } })
    if (!history) throw { message: 'History not found' }

    const article = await Article.findOne<Article>({ _id: { $eq: articleId } })
    if (!article) throw { message: 'Article not found' }

    const updatedArticle = await Article.findByIdAndUpdate(
      { _id: articleId },
      {
        $set: {
          title: history.title,
          description: history.description,
          metaDesc: history.metaDesc,
          keywords: history.keywords,
          featured_image: history.featured_image,
          // slug: history.slug,
          edited: article.edited ? article.edited + 1 : 1,
        },
      },
      { new: true }
    ).exec()

    // copy it to ArticleHistory
    await ArticleHistory.create({
      title: article.title,
      description: article.description,
      slug: article.slug,
      keywords: article.keywords,
      metaDesc: article.metaDesc,
      articleId: articleId,
      updatedBy: article.createdBy,
      deletedAt: article.deletedAt,
      createdBy: article.createdBy,
      edited: article.edited,
    })
    return updatedArticle
  } catch (err) {
    console.error(err)
    throw err
  }
}
