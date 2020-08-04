import nc from 'next-connect'
import { randomBytes } from 'crypto'
import database from '../../middleware/database'
import User from '../../database/models/user'
import { resetPassword } from '../../middleware/validation'
import { sendPasswordResetEmail } from '../../lib/sgMail'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(database)
  .use(resetPassword)
  .post(async (req, res) => {
    const { email } = req.body
    const resetPasswordToken = await randomBytes(20).toString('hex')

    await User.updateOne(
      { email },
      {
        $set: {
          reset_password_token: resetPasswordToken,
          reset_password_expires: Date.now() + 3600000,
        },
      }
    )

    // Check if email was really sent
    await sendPasswordResetEmail(email, resetPasswordToken)

    res.status(200).json({
      msg: 'Check your email for further instructions to reset your password.',
    })
  })
