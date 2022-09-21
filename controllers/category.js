const Category = require('../models/category')

// only role == 1 (admin) can create, update, delete categories 
const categoryCtrl = {
    create: async (req, res) => {
        try {
            const { name } = req.body
            // check if category name is already exists
            const category = await Category.findOne({ name })
            if (category)
                return res.status(400).json({ msg: "Category name already exists!" })

            const newCategory = new Category({ name })
            await newCategory.save()
            res.json({ msg: "Create new category successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    get: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body
            // check if category name is already exists
            const category = await Category.findOne({ name })
            if (category)
                return res.status(400).json({ msg: "Category name already exists!" })
            // update category
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Update category successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })

            if (products)
                return res.status(400).json({ msg: "Please delete all products with a relationship." })
            //delete category
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete category successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = categoryCtrl
