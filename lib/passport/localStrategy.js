import LocalStrategy from 'passport-local'
import passport from 'passport'
import User from '../../database/models/user'
import { compare } from 'bcryptjs'
import { signJWT } from '../jwt'

const local = new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    const { sessionCookie } = req.body // If cookie should be session or not

    const user = await User.findOne({ email })

    if (!user || !(await compare(password, user?.password))) {
      done(null, false, { msg: 'Wrong email or password.' })
    } else {
      const token = await signJWT({ id: user._id })
      done(null, token)
    }
  }
)

export default passport.use(local)
