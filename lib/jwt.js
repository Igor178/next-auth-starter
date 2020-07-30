import { sign, verify } from 'jsonwebtoken'

export const signJWT = async (payload) => {
  const token = await sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' }) // Default to 6 hours
  return token
}

export const verifyJWT = async (token) => {
  const data = await verify(token, process.env.JWT_SECRET)
  return data
}
