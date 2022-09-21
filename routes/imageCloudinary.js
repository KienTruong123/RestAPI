const router = require('express').Router()
const fs = require('fs')
const cloudinary = require('cloudinary')
const auth = require('../middleware/auths')
const authAdmin = require('../middleware/authsAdmin')

// Configuration cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload image
router.post('/', auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No uploaded files!' })

        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            fs.unlink(file.tempFilePath, err => { if (err) throw err; })
            return res.status(400).json({ msg: "The image is too large to upload and needs to be resized." })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            fs.unlink(file.tempFilePath, err => { if (err) throw err; })
            return res.status(400).json({ msg: "Incorrect File Format." })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "VIEELUESSE" }, async (err, result) => {
            if (err) throw err;
            fs.unlink(file.tempFilePath, err => { if (err) throw err; })
            res.json({ public_id: result.public_id, url: result.secure_url })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

// Delete image
router.delete('/',auth , authAdmin, (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images selected!'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;
            res.json({msg: "Delete image successfully!"})
        })

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

module.exports = router