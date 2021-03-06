import nc from 'next-connect'
import isAuth from '../../middleware/auth'
import database from '../../middleware/database'
import User from '../../database/models/user'
import { sendAccountDeletedEmail } from '../../lib/sgMail'
import { destroyCookie } from '../../lib/cookies'
import { updateProfile } from '../../middleware/validation'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(isAuth)
  .use(database)
  .get(async (req, res) => {
    const profile = await User.findOne({ _id: req.user.id })

    res.status(200).json(profile)
  })
  .delete(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.user.id })

    if (!user) {
      res.status(404).msg({
        msg: 'Something went wrong when trying to delete your account.',
      })
    }

    // Check if email was really sent
    await sendAccountDeletedEmail(user.email)

    res.setHeader('Set-Cookie', destroyCookie())
    res.status(200).json({ msg: 'Your account has been deleted.' })
  })
  .use(updateProfile)
  .post(async (req, res) => {
    await User.updateOne({ _id: req.user.id }, req.body)

    res.status(200).json({ msg: 'Your profile has been updated!' })
  })
