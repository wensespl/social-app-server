const bcrypt = require('bcryptjs')
const { generateJWT } = require('../middlewares/JWT')

const User = require('../models/User')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.findOne({ email })

    if (user)
      return res.status(400).json({ msg: `user whit email ${email} exists` })

    user = new User({ username, email })

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const token = await generateJWT(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({
      mgs: error
    })
  }
}

const login = async (req, res) => {
  try {
    const { password, email } = req.body
    const user = await User.findOne({ email })

    if (!user)
      return res.status(400).json({ msg: 'Email or password are incorrect' })

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword)
      return res.status(400).json({ msg: 'Email or password are incorrect' })

    const token = await generateJWT(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({
      mgs: error
    })
  }
}

const renewToken = async (req, res) => {
  const { userId, user } = req

  const token = await generateJWT(userId)

  res.json({
    user,
    token
  })
}

module.exports = { register, login, renewToken }
