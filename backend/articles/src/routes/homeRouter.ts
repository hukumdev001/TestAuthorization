import express, { Request, Response } from 'express'

import { getAll, getOne, getPopular } from '../services/home'

const homeRouter = express.Router()

homeRouter.get('/popular-articles', async (req: Request, res: Response) => {
  try {
    const popularArticles = await getPopular()
    return res.status(200).json(popularArticles)
  } catch (err) {
    console.error(err)
    return res.status(404).json(err)
  }
})

homeRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const article = await getOne({ slug })
    return res.status(200).json(article)
  } catch (err) {
    return res.status(404).json(err)
  }
})

homeRouter.get('/', async (req: Request, res: Response) => {
  const articles = await getAll()
  return res.status(200).json(articles)
})

export default homeRouter
