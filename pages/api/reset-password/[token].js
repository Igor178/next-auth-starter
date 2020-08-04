import nc from 'next-connect'
import { hash } from 'bcryptjs'
import database from '../../../middleware/database'
import User from '../../../database/models/user'
import { resetPasswordRecover } from '../../../middleware/validation'
import { signJWT } from '../../../lib/jwt'
import { createCookie } from '../../../lib/cookies'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(database)
  .use(resetPasswordRecover)
  .post(async (req, res) => {
    const { password } = req.body
    const { token } = req.query

    const user = await User.findOneAndUpdate(
      {
        reset_password_token: token,
        reset_password_expires: { $gt: Date.now() },
      },
      {
        password: await hash(password, 8),
        $unset: { reset_password_expires: undefined, reset_password_token: '' },
      },
      { new: true }
    )

    if (user) {
      const jwt = await signJWT({ id: user._id })
      res.setHeader('Set-Cookie', createCookie(jwt))
      res.status(200).json({ msg: 'Your password has been changed!' })
    } else {
      res.status(400).json({
        data: {
          errors: {
            msg: [
              'Invalid reset token, please try reseting your password again.',
            ],
          },
        },
      })
    }
  })
