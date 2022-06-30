import mongoose from 'mongoose'
import { IUser } from '../@types/User'

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    roles: [
      {
        type: String,
      },
    ],
    token: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
)
UserSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.password
    delete ret.token
  },
})

const User = mongoose.model<IUser>('User', UserSchema)

module.exports = User
