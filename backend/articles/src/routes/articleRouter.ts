import express, { Request, Response } from 'express'

import validate from '../utils/validate'
import { articleValidation } from '../validations/article.validation'
import { create, update, destroy, getAll, getOne, restoreHistory } from '../services/article'

const articleRouter = express.Router()

articleRouter.post('/restoreHistory/:articleId/:historyId', async (req: Request, res: Response) => {
  try {
    const { articleId, historyId } = req.params
    const updateArticle = await restoreHistory(articleId, historyId)
    return res.status(200).json(updateArticle)
  } catch (err) {
    console.error(err)
    return res.status(404).json(err)
  }
})

articleRouter.post('/create', validate(articleValidation), async (req: Request, res: Response) => {
  try {
    const { title, description, keywords, metaDesc, slug, featured_image } = req.body

    const article = await create({
      title,
      description,
      keywords,
      metaDesc,
      slug,
      createdBy: req.user?.id,
      authorName: req.user?.name,
      featured_image,
    })
    return res.status(201).json(article)
  } catch (e) {
    return res.status(422).json(e)
  }
})

articleRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const article = await getOne({
      slug,
      userRole: {
        isAdmin: req.isAdmin || false,
        isPublisher: req.isPublisher || false,
        userId: req.user?.id || null,
      },
    })
    return res.status(200).json(article)
  } catch (e) {
    return res.status(422).json(e)
  }
})

articleRouter.patch(
  '/update/:id',
  validate(articleValidation),
  async (req: Request, res: Response) => {
    try {
      const { title, description, keywords, metaDesc, slug, featured_image } = req.body
      const { id } = req.params
      const updatedArticle = await update(
        { title, description, keywords, metaDesc, slug, featured_image },
        id,
        req.user?.id || null
      )
      return res.status(200).json(updatedArticle)
    } catch (e) {
      return res.status(422).json(e)
    }
  }
)

articleRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const resp = await destroy(
      {
        articleId: id,
        userRole: {
          isAdmin: req.isAdmin || false,
          isPublisher: req.isPublisher || false,
          userId: req.user?.id || null,
        },
      },
      req.user?.id || null
    )
    return res.status(200).json({ message: 'Article Deleted' })
  } catch (e) {
    return res.status(422).json(e)
  }
})

articleRouter.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await getAll({
      isAdmin: req.isAdmin || false,
      isPublisher: req.isPublisher || false,
      userId: req.user?.id || null,
    })
    return res.status(200).json(articles)
  } catch (e) {
    return res.status(422).json(e)
  }
})

export default articleRouter
