const router = require('express').Router()

const { getAllUsers } = require('../controllers/UserControllers')

router.route('/').get(getAllUsers)

module.exports = router
