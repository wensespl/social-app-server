const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    followers: { type: Array, default: [], ref: 'User' },
    followins: { type: Array, default: [], ref: 'User' },
    isAdmin: { type: Boolean, default: false }
  },
  { versionKey: false, timestamps: true }
)

UserSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject()
  user.userId = _id
  return user
}

module.exports = mongoose.model('User', UserSchema)
