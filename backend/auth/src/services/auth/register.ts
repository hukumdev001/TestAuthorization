import mongoose from 'mongoose'
import { hash } from '../../utility/crypto'

export const register = async (name: string, email: string, password: string,) => {
  try {
    const User = mongoose.model('User')

    const exitingUser = await User.findOne({ email })
    if (exitingUser) throw { message: 'User already registered' }

    return await new User({
      name: name,
      email: email,
      password: await hash(password),
      roles: ['publisher'],
    }).save()
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const UpdateRole = async (email: string, role: string) => {
  try {
    const User = mongoose.model('User')

    console.log('emial', email)

    const exitingUser = await User.findOne({ email: email})
    if (!exitingUser) {
      throw { message: 'User doesnot registered' }
    } 
    const updateUser = await User.updateOne({email: email}, {$set: {roles: role}})
 
    return updateUser

   
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getAllUser = async () => {
  try {
    const User = mongoose.model('User')

    const AllUser = await User.find();

    return AllUser
  } catch (e) {
    console.error(e)
    throw e
  }
}
