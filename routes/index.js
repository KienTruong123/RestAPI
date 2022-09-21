const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/api/category', require('./category'))
router.use('/api/image', require('./imageCloudinary'))
router.use('/api/product', require('./product'))

module.exports = router;
