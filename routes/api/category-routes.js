// Dependencies
const router = require('express').Router();
const { Category, Product } = require('../../models');

// http://localhost:3001/api/categroies(router.get)

// GET all categories
router.get('/', (req, res) => {
  // .findAll to display all current Category entries
  Category.findAll({
    include: {
      // include child Products of each category
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  // respond with the categoryData from the database
  }).then(categoryData => res.json(categoryData)).catch(err => { // catch and log error 
    console.log(err);
    // 500 - unexpected server condition
    res.status(500).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/categroies/

// GET a single Category 
router.get('/:id', (req, res) => { // replace :id with desired Category ID number
  // .findOne to display specific Category
  Category.findOne({
    where: {
      // use the requested ID from the router.get() parameter
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }).then(categoryData => res.json(categoryData)).catch(err => { //
    console.log(err);
    // 404 - category was not found
    res.status(404).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/categroies/6(category-ID)

// POST/Create a new category
router.post('/', (req, res) => {
  // .create to create new category
  Category.create({
    // expected req.body input(s)
    category_name: req.body.category_name
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    // 400 - bad request
    res.status(400).json(err);
  });
});
// Example: 
// POST http://localhost:3001/api/categroies/
// req.body: 
// {
//   "category_name": "Jeans"
// }

// PUT/Update an existing category
router.put('/:id', (req, res) => { 
  // .update to overwrite content in an existing category
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
    category_name: req.body.category_name
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});
// Example: 
// PUT http://localhost:3001/api/categroies/6(category ID)
// req.body: 
// {
//   "category_name": "Men's Jeans"
// }

// DELETE a specified category
router.delete('/:id', (req, res) => {
  // .destroy to remove the specified category 
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});
// Example: 
// DELETE http://localhost:3001/api/categroies/6(category ID)

module.exports = router;
