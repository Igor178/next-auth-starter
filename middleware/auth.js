import { verifyJWT } from '../lib/jwt'

const isAuth = async (req, res, next) => {
  const { auth } = req.cookies

  if (!auth) {
    return res.status(401).json({ msg: 'You need to log in.' })
  }

  const user = await verifyJWT(auth)
  req.user = user

  next()
}

export default isAuth
