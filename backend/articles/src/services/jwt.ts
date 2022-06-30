import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../@types/User'

export async function createToken(user: User) {
  const token = await jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

export function verifyJwt(token: string): JwtPayload | string {
  return jwt.verify(token, process.env.JWT_DECODE as string)
}
