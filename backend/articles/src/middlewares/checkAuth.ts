import { Request, Response, NextFunction } from 'express'
import { User } from '../@types/User'
import { verifyJwt } from '../services/jwt'

export const checkPermissions =
  (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { headers } = req
      const authorization = headers['authorization'] as string
      const token = authorization.split(' ')[1]
      if (!token) {
        throw {
          error: 'Headers missing',
        }
      }
      const jwtResponse = verifyJwt(token as string)
      const user = jwtResponse as User
      if (!roles.some((r) => user.roles.includes(r)) && roles.length > 0)
        throw { message: 'Permission Denied', status: 403 }
      req.user = user

      // add user roles to request
      req.isAdmin = user.roles.includes('admin') ? true : false
      req.isPublisher = user.roles.includes('publisher') ? true : false

      next()
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  }
