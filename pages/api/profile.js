import nc from 'next-connect'
import isAuth from '../../middleware/auth'
import database from '../../middleware/database'
import User from '../../database/models/user'

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

    // Don't send back password and other data that's not needed
    res.status(200).json(profile)
  })
