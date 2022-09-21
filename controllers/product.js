const Products = require('../models/product')

class Features {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    create: async (req, res) => {
        try {
            const { product_id, title, description, price, sold, size, color, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No uploaded images!" })

            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "Product id already exists." })

            const newProduct = new Products({ product_id, title, description, price, sold, size, color, content, images, category })
            await newProduct.save()
            res.json({ msg: "Create product successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    get: async (req, res) => {
        try {
            const features = new Features(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query

            res.json({ status: 'success', products: products, number: products.length })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No uploaded images!" })

            await Products.findOneAndUpdate({ _id: req.params.id }, { title, description, price, sold, size, color, content, images, category })
            res.json({ msg: "Update product successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete product successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}


module.exports = productCtrl