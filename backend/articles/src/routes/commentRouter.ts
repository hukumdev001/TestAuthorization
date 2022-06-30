import express, { Request, Response } from 'express'

import { create } from '../services/comment'
import { create as createRating } from '../services/rating'

const commentRouter = express.Router()

commentRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { email, comment, articleId, ratings } = req.body
    if (ratings && parseInt(ratings))
      await createRating({ email, rating: ratings as number, ipAddress: req.ip, articleId })
    const newComment = await create({ email, comment, articleId, ipAddress: req.ip })

    return res.status(201).json(newComment)
  } catch (err) {
    return res.status(500).json(err)
  }
})

export default commentRouter
