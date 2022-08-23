const router = require('express').Router()

const {
  register,
  login,
  renewToken
} = require('../controllers/AuthControllers')
const { validateJWT } = require('../middlewares/JWT')

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/renew', validateJWT, renewToken)

module.exports = router
