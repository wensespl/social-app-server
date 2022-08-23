const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
require('express-async-errors')

const errorHandler = require('./middlewares/errorHandler')

const userRoutes = require('./routes/UserRoutes')
const authRouters = require('./routes/AuthRouters')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRouters)

app.use(errorHandler)

module.exports = app
