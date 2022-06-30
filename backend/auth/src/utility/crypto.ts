import crypto from 'crypto'

const KEY_LENGTH = 64
const DIGEST = 'sha512'
const ITERATIONS = 512

export const hash = (string: string, salt = process.env.SALT || '') => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(string, salt, ITERATIONS, KEY_LENGTH, DIGEST, (err, hash) => {
      if (err) {
        reject(err)
      }
      resolve(hash.toString('hex'))
    })
  })
}

export const compare = async (string: string, hashed: string, salt = process.env.SALT || '') => {
  return (await hash(string, salt)) === hashed
}
