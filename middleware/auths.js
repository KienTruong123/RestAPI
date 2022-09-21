const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")

        if(!token)
            return res.status(400).json({msg: "User authentication failed, please check your authentication!"})

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
            if(err)
                return res.status(400).json({msg: "User authentication failed due to invalid authentication values!"})

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = auth