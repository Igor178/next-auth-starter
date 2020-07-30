import connectToMongo from '../database/db'

const database = async (req, res, next) => {
  await connectToMongo()
  next()
}

export default database
