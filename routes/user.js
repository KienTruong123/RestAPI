const router = require('express').Router()
const userCtrl = require('../controllers/user')
const auths = require('../middleware/auths')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/information', auths, userCtrl.getUser)

router.get('/refresh_token', userCtrl.refreshToken)

router.put('/cart', userCtrl.addToCart)

router.patch('/cart', userCtrl.updateCart)

router.get('/history', auths, userCtrl.history)
module.exports = router