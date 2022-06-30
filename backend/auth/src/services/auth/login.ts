import mongoose from 'mongoose'
import { IUser } from '../../@types/User'
import { compare } from '../../utility/crypto'
import { createToken } from '../jwt'

export const login = async (email: string, password: string) => {
  const User = mongoose.model('User')
  const errors = []

  if (!email) {
    errors.push('email is required')
  }
  if (!password) {
    errors.push('password is required')
  }
  if (errors.length > 0) {
    throw { message: errors.join(','), status: 422 }
  }

  const foundUser = await User.findOne<IUser>({ email })

  if (!foundUser) throw { message: 'User is not registered' }
  if (!foundUser.password) throw { message: 'User Uses Oauth for Authentication' }

  const verifyPassword = await compare(password, foundUser.password)

  if (!verifyPassword) throw { message: 'Password is not correct' }

  const token = await createToken({
    email: foundUser.email,
    id: foundUser.id,
    name: foundUser.name,
    roles: foundUser.roles,
  })
  await User.updateOne({ id: foundUser.id, token })
  return { token, foundUser }
}
