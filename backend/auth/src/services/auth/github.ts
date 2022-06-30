import axios from 'axios'
import mongoose from 'mongoose'
import { IUser } from '../../@types/User'
import { createToken } from '../jwt'

const User = mongoose.model('User')

/**
 * Helper function to generate JWT token
 */
async function generateToken(id: string, email: string, name: string, roles: string[]) {
  const token = await createToken({
    email,
    id,
    name,
    roles,
  })
  await User.updateOne({ id, token })
  return { token, id, roles, name }
}

/**
 * gets access token from github oauth API
 * @param code code returned from Github authorization api
 * @returns Promise<string>
 */
async function getGithubToken(code: string): Promise<string> {
  const resp = await axios.post<{ access_token: string; error: unknown }>(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_CALLBACK,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
  const token = resp.data.access_token
  if (!token) throw { message: resp.data.error }
  return token
}

/**
 *
 * @param token github oauth access token
 * @returns Response from github API
 */
async function getGithubUser(token: string) {
  return await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  })
}

export const github = async (code: string) => {
  let token = ''
  try {
    token = await getGithubToken(code)
  } catch (e) {
    console.error(e)
    throw e
  }
  try {
    const githubUser = await getGithubUser(token)
    const { email, name } = githubUser.data

    const foundUser = await User.findOne<IUser>({ email })
    if (!foundUser) {
      // create user if doesn't exist
      const user = await User.create({
        name: name,
        email: email,
        roles: ['publisher'],
      })
      return generateToken(user.id, email, name, ['publisher'])
    }
    // return token if existing user
    return generateToken(foundUser.id, foundUser.email, foundUser.name, foundUser.roles)
  } catch (e) {
    console.error(e)
    throw e
  }
}
