require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))

// Connect DB mongoose
const URI = process.env.MONGODB
mongoose.connect(URI, err => { if (err) throw err })

//Routers
app.use('/', require('./routes'))

const PORT = process.env.PORT || 9999
app.listen(PORT, () => { console.log('Server is running on port ', PORT) })
