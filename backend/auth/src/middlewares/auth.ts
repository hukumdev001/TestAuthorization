import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../services/jwt'

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { headers } = req
    const token = headers['x-publisher-token']
    if (!token) {
      throw {
        error: 'Headers missing',
      }
    }
    const jwtResponse = verifyJwt(token as string)
    res.locals.claims = jwtResponse
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}
