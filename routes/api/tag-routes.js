const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// http://localhost:3001/api/tags(router.get)

// Get all tags
router.get('/', (req, res) => {
  // .findAll to display all current Category entries
  Tag.findAll({
    // Tag data to be included in the response
    include: {
      // include the parent model, Category for each Tag
      model: Product
    }
    // respond with the tagData from the database
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    // 500 - unexpected server condition
    res.status(500).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/tags/

// GET a single Tag
router.get('/:id', (req, res) => { // replace :id with desired Tag ID number
  // .findOne to display specific Tag
  Tag.findOne({
    where: {
      // use the requested Tag ID from the router.get() parameter
      id: req.params.id
    },
    include: {
      model: Product
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    // 404 - Tag was not found
    res.status(404).json(err);
  });
});
// Example: 
// GET http://localhost:3001/api/tags/6(Tag-ID)

// POST/Create a new tag
router.post('/', (req, res) => {
  // .create to create new Tag
  Tag.create({
    // expected req.body input(s)
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    // 400 - bad request
    res.status(400).json(err);
  });
});
// Example: 
// POST http://localhost:3001/api/tags/
// req.body: 
// {
//   "tag_name": "black"
// }

// PUT/Update an existing Tag
router.put('/:id', (req, res) => {
  // .update to overwrite an existing Tag
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});
// Example: 
// PUT http://localhost:3001/api/tags/9(Tag-ID)
// req.body: 
// {
//   "tag_name": "dark blue"
// }

// DELETE the user specified Tag
router.delete('/:id', (req, res) => {
  // .destroy to remove the specified Tag
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});
// Example: 
// DELETE http://localhost:3001/api/tags/6(Tag-ID)

module.exports = router;
