const router = require('express').Router()

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow
} = require('../controllers/UserControllers')
const { validateJWT } = require('../middlewares/JWT')

router.use(validateJWT)
router.route('/').get(getAllUsers)
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:userId/follow').put(follow)
router.route('/:userId/unfollow').put(unfollow)

module.exports = router
