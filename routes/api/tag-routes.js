const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get/Find all of the categories
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.json(500).json(err);
  });
});

// Get/Find one of the user specified categories
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Post/Create a new category
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Put/Update an existing category
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    },
    tag_name: req.params.id
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete/Destroy a user specified category
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
