const app = require('./app')
const connectDB = require('./db')
require('dotenv').config()

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL

connectDB(mongo_url)
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
