const Users = require('../models/user')
userCtrl = {
    register : (req, res) => {
        res.json({msg: "Post Register"})
    }
}

module.exports = userCtrl