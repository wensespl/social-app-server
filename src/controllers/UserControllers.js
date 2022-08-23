const bcrypt = require('bcryptjs')

const User = require('../models/User')

const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users })
}

const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.status(200).json({ user })
}

const updateUser = async (req, res) => {
  if (req.userId !== req.params.userId && !req.user.isAdmin)
    return res.status(403).json({ msg: "You can't update this account" })

  if (req.body.password) {
    const salt = bcrypt.genSaltSync()
    req.body.password = bcrypt.hashSync(req.body.password, salt)
  }

  const user = await User.findByIdAndUpdate(req.params.userId, {
    $set: req.body
  })

  res.status(200).json({ msg: 'Account has been updated' })
}

const deleteUser = async (req, res) => {
  if (req.userId !== req.params.userId && !req.user.isAdmin)
    return res.status(403).json({ msg: "You can't delete this account" })

  const user = await User.findByIdAndDelete(req.params.userId)

  res.status(200).json({ msg: 'Account has been deleted' })
}

const follow = async (req, res) => {
  if (req.userId === req.params.userId)
    throw new Error("You can't follow yourself")

  const user = await User.findById(req.params.userId)

  if (user.followers.includes(req.userId))
    throw new Error('You allready follow this user')

  await user.updateOne({ $push: { followers: req.userId } })
  await User.findByIdAndUpdate(req.userId, {
    $push: { followings: req.params.userId }
  })

  res.status(200).json({ msg: 'user has been followed' })
}

const unfollow = async (req, res) => {
  if (req.userId === req.params.userId)
    throw new Error("You can't unfollow yourself")

  const user = await User.findById(req.params.userId)

  if (!user.followers.includes(req.userId))
    throw new Error("You don't follow this user")

  await user.updateOne({ $pull: { followers: req.userId } })
  await User.findByIdAndUpdate(req.userId, {
    $pull: { followings: req.params.userId }
  })

  res.status(200).json({ msg: 'user has been unfollowed' })
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow
}
