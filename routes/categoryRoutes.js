const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Add Category
router.post('/categories', async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });
  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error adding category' });
  }
});

// Fetch Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Delete Category
router.delete('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;
