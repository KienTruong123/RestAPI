const router = require('express').Router()
const productCtrl = require('../controllers/product')
const auths = require('../middleware/auths')
const authsAdmin = require('../middleware/authsAdmin')


router.route('/')
    .post(auths, authsAdmin, productCtrl.create)
    .get(productCtrl.get)

router.route('/:id')
    .put(auths, authsAdmin, productCtrl.update)
    .delete(auths, authsAdmin, productCtrl.delete)

module.exports = router