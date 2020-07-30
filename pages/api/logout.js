import nc from 'next-connect'
import { destroyCookie } from '../../lib/cookies'

export default nc({
  onNoMatch: (req, res) => {
    const { method } = req
    res.status(400).json({ msg: `Method ${method} is not supported.` })
  },
}).get(async (req, res) => {
  res.setHeader('Set-Cookie', destroyCookie())
  res.status(200).json({ msg: 'You are logged out.' })
})
