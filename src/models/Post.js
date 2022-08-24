const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, required: true },
    desc: { type: string, max: 500 },
    img: { type: String },
    likes: { type: Array, default: [] }
  },
  { versionKey: false, timestamps: true }
)

PostSchema.methods.toJSON = function () {
  const { _id, updatedAt, ...post } = this.toObject()
  post.postId = _id
  return post
}

module.exports = mongoose.model('Post', PostSchema)
