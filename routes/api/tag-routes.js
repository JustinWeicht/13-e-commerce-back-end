const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get/Find all of the tag
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
});

// Get/Find one of the user specified tags
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
    res.status(404).json(err);
  });
});

// Post/Create a new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Put/Update an existing tag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    },
    tag_name: req.params.id
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// Delete/Destroy a user specified tag
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => res.json(tagData)).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
