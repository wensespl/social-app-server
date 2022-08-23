const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    followers: { type: Array, default: [], ref: 'User' },
    followings: { type: Array, default: [], ref: 'User' },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] }
  },
  { versionKey: false, timestamps: true }
)

UserSchema.methods.toJSON = function () {
  const { password, _id, isAdmin, updatedAt, ...user } = this.toObject()
  user.userId = _id
  return user
}

module.exports = mongoose.model('User', UserSchema)
