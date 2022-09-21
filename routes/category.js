const router = require('express').Router()
const auths = require('../middleware/auths')
const categoryCtrl = require('../controllers/category')
const authsAdmin = require('../middleware/authsAdmin')

router.route('/category')
    .post(auths, authsAdmin, categoryCtrl.create)
    .get(categoryCtrl.get)

router.route('/category/:id')
    .put(auths, authsAdmin, categoryCtrl.update)
    .delete(auths, authsAdmin, categoryCtrl.delete)

module.exports = router