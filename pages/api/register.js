import nc from 'next-connect'
import database from '../../middleware/database'
import User from '../../database/models/user'
import { register } from '../../middleware/validation'
import { createCookie } from '../../lib/cookies'
import { signJWT } from '../../lib/jwt'
import { sendRegisterWelcomeEmail } from '../../lib/sgMail'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
})
  .use(database)
  .use(register)
  .post(async (req, res) => {
    const user = new User(req.body)

    await user.save()

    const token = await signJWT({ id: user._id })

    // Check if email was delivered
    await sendRegisterWelcomeEmail(user.email, user.name)

    res.setHeader('Set-Cookie', createCookie(token))
    res.status(200).json({ msg: 'New user is created.' })
  })
