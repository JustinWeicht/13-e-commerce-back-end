const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// http://localhost:3001/api/products(router.get)

// GET/Find all Products
router.get('/', (req, res) => {
  // .findAll to display all current Product entries
  Product.findAll({
    // w/ the specified Product attributes below
    attributes: ['id', 'product_name', 'price', 'stock'],
    // Product data to be included in the response
    include: [
      {
        // include the parent model, Category for each Product
        model: Category,
        attributes: ['category_name']
      },
      {
        // include child Tags for each Category
        model: Tag,
        attributes: ['tag_name']
      }
    ]
    // respond with the productData from the database
  }).then(productData => res.json(productData)).catch(err => {
    console.log(err);
    // 500 - unexpected server condition
    res.status(500).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/products/

// GET a single Product
router.get('/:id', (req, res) => { // replace :id with desired Product ID number
  // .findOne to display specific Product
  Product.findOne({
    where: {
      // use the requested Product ID from the router.get() parameter
      id: req.params.id
    },
    // Product parameters to include
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [{
      model: Category,
      attributes: ['category_name']
    },
    {
      model: Tag,
      attributes: ['tag_name']
    }]
  }).then(productData => res.json(productData)).catch(err => {
    console.log(err);
    // 404 - Product was not found
    res.status(404).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/poducts/6(Product-ID)

// POST/Create a new product
router.post('/', (req, res) => {
  // .create to create new Product
  Product.create({
    // expected req.body input(s)
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds
  // pass the product request into an if/else function 
  }).then((product) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    // 200 - OK success resopnse
    res.status(200).json(product);
  })
  // 
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    // 400 - bad request
    res.status(400).json(err);
  });
});
// Example: 
// PUT http://localhost:3001/api/products/
// req.body: 
// {
//   "product_name": "Skinny Fit",
//   "price": 200.00,
//   "stock": 3,
//   "tagIds": [1, 2, 3, 4]
// }

// PUT/Update an existing Product
router.put('/:id', (req, res) => {
  // .update to overwrite an existing Product
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});
// Example: 
// PUT http://localhost:3001/api/products/6
// req.body: 
// {
//   "product_name": "Skinny Fit",
//   "price": 200.00,
//   "stock": 3,
//   "tagIds": [1, 2, 3, 4]
// }

// DELETE the user specified Product
router.delete('/:id', (req, res) => {
  // .destroy to remove the specified Product
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(productData => res.json(productData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});

module.exports = router;
