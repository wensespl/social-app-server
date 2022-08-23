const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoutes = require('./routes/UserRoutes')
const authRouters = require('./routes/AuthRouters')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/users', userRoutes)
app.use('/ap1/auth', authRouters)

module.exports = app
