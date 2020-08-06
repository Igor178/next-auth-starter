import nc from 'next-connect'
import { compare } from 'bcryptjs'
import isAuth from '../../middleware/auth'
import database from '../../middleware/database'
import User from '../../database/models/user'
import { sendPasswordChangedEmail } from '../../lib/sgMail'
import { changePassword } from '../../middleware/validation'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(isAuth)
  .use(database)
  .use(changePassword)
  .post(async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })

    if (await compare(req.body.current_password, user.password)) {
      user.password = req.body.password
      await user.save()

      // Should check if email was delivered
      await sendPasswordChangedEmail(user.email, user.name)
      res.status(200).json({ msg: 'Your password was successfully changed.' })
    } else {
      res.status(400).json({
        data: {
          errors: {
            msg: [
              'Password you have provided does not match your current password.',
            ],
          },
        },
      })
    }
  })
