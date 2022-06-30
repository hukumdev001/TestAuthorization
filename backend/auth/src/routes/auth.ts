import express, { Request, Response } from 'express'

import { register, login, github, UpdateRole, getAllUser } from '../services/auth'

const authRouter = express.Router()

authRouter.get('/github-callback', async (req: Request, res: Response) => {
  try {
    const { code } = req.query
    if (!code || typeof code !== 'string') throw { message: 'Invalid Code' }
    const response = await github(code)
    res.json(response)
  } catch (e) {
    return res.status(422).json(e)
  }
})

authRouter.route('/register').post(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const user = await register(name, email, password)
    return res.json(user).status(201)
  } catch (e) {
    return res.status(500).json(e)
  }
})

authRouter.route('/updateRole').put(async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body
    const user = await UpdateRole(email, role)

    return res.json(user).status(201)
  } catch (e) {
    return res.status(500).json(e)
  }
})

authRouter.route('/getAllUser').get(async (req: Request, res: Response) => {
  try {
    const user = await getAllUser()

    return res.json(user).status(201)
  }catch (e) {
    return res.status(500).json(e)
  }
})

authRouter.route('/login').post(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { token, foundUser } = await login(email, password)
    return res.json({ token, id: foundUser.id, roles: foundUser.roles, name: foundUser.name })
  } catch (error) {
    console.error(error)
    return res.status(422).json(error)
  }
})

export default authRouter
