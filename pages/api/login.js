import nc from 'next-connect'
import database from '../../middleware/database'
import passport from 'passport'
import local from '../../lib/passport/localStrategy'
import { login } from '../../middleware/validation'
import { createCookie } from '../../lib/cookies'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(database)
  .use(login)
  .post(async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (!user) {
        return res.status(404).json(info)
      }

      res.setHeader('Set-Cookie', createCookie(user, req.body.sessionCookie))
      res.status(200).json({ msg: 'You are logged in.' })
    })(req, res, next)
  })
