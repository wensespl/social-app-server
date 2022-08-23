const jwt = require('jsonwebtoken')

const User = require('../models/User')

const generateJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('Error generating token')
        }
        resolve(token)
      }
    )
  })
}

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      msg: 'No token received'
    })
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_JWT)

    const user = await User.findById(userId)

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token'
      })
    }

    req.userId = userId
    req.user = user
  } catch (error) {
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }

  next()
}

module.exports = { generateJWT, validateJWT }
