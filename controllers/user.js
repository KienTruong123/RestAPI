const Users = require("../models/user")
const saltRounds = 12
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await Users.findOne({ email })

            if (user)
                return res.status(400).json({ msg: "This email address is already being used." })
            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters." })

            // Encrypt the password
            const passwordHash = await bcrypt.hash(password, saltRounds)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save
            await newUser.save()

            // Create jsonwebtoken to authentication
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            // creare cookies access token
            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60000 // 7 days
            })

            res.json({ accessToken })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const refreshToken = req.cookies.refreshtoken

            // check if refresh token is already
            if (!refreshToken)
                return res.status(400).json({ msg: 'Please login first!' })

            // check if refresh token is valid
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(400).json({ msg: "Please login first!" })

                const accessToken = createAccessToken({ id: user.id })
                res.json({ accessToken })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },
    login: async (req, res) => {
        try {
            const { email_phone, password } = req.body
            // console.log(email_phone, password)
            const user = await Users.findOne({ email_phone })
            if (!user)
                return res.status(400).json({ msg: "Incorrect email,phone or password" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ msg: "Incorrect email,phone or password." })

            // If login success then create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60000
            })

            res.json({ accesstoken })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" })
            return res.json({ msg: "Logout Successful " })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user)
                return res.status(400).json({ msg: "User ID does not exist!" })
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}

const createAccessToken = (user_id) => {
    return jwt.sign(user_id, process.env.ACCESS_TOKEN, { expiresIn: "10m" })
}
const createRefreshToken = (user_id) => {
    return jwt.sign(user_id, process.env.REFRESH_TOKEN, { expiresIn: "7d" })
}

module.exports = userCtrl