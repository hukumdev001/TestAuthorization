import { Document } from 'mongoose'

export interface IUser extends Document {
  id: string
  email: string
  name: string
  roles: string[]
  password?: string
  token?: string[]
}
