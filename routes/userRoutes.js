const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.createUser)
router.get('/login', userController.getUser)
router.put('/update', userController.updateUser)
router.delete('/removeuser', userController.deleteUser)

module.exports = router