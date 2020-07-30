import { connect } from 'mongoose'

const connection = {}

const connectToMongo = async () => {
  if (connection.isConnected) {
    console.log('Already connected.')
    return
  }
  const db = await connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  connection.isConnected = db.connections[0].readyState // Returns 1 if there is a connection
}

export default connectToMongo
