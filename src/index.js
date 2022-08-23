const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL

const userRoutes = require('./routes/UserRoutes')
const authRouters = require('./routes/AuthRouters')

const app = express()

mongoose.connect(
  mongo_url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB')
  }
)

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/users', userRoutes)
app.use('/ap1/auth', authRouters)

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
