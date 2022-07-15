import { Request, Response, NextFunction } from 'express'
import { User } from '../@types/User'
import { verifyJwt } from '../services/jwt'
import client from '../utils/authClient'

export const checkPermissions =
  (Permission: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { headers } = req
      const authorization = headers['authorization'] as string
      if (!authorization) {
        throw {
          error: 'Authorization required',
        }
      }
      const token = authorization.split(' ')[1]
      if (!token) {
        throw {
          error: 'Headers missing',
        }
      }
      const jwtResponse = verifyJwt(token as string)
      const user = jwtResponse as User

      const { permission } = client

      console.log(user.roles)
      const AllPermission: any = await permission.getAllPermissionsByRoleName(user.roles[0])

      console.log('AllPermmision', AllPermission)

      console.log('Route Permission', Permission)

      if (
        !Permission.some((r) => AllPermission.filter((e: any) => e.Action === r).length > 0) &&
        Permission.length > 0
      )
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
