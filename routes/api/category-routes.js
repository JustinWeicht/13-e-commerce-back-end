const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get/Find all of the categories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get/Find one of the user specified categories
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Post/Create a new category
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: res.body.category_name
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Put/Update an existing category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.bdy.category_name
    },
    category_name: req.body.category_name
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Delete/Destroy a user specified category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
