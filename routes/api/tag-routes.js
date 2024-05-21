const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route for getting all tags
router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      { model: Product },
    ]
  });
  res.status(200).json(tags);
});

// Route for getting a specific tag
router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  if (!tagData) {
    res.status(404).json({ message: "No tag found with this id!" });
    return;
  }
  res.status(200).json(tagData);

});

// Route for creating a new tag
router.post('/', async (req, res) => {
  const newTag = await Tag.create(req.body);
  res.status(200).json(newTag);
});

// Route for updating a tag
router.put('/:id', async (req, res) => {
  const updatedTag = await Tag.update(req.body, {
    where: { id: req.params.id},
  });
    if (!updatedTag) {
      res.status(404).json({message: "Updated Failed"});
      return;
    }
    res.status(200).json(updatedTag);
  });


// Route for deleting a tag
router.delete('/:id', async (req, res) => {
  const deletedTag = await Tag.destroy({ where: {id: req.params.id}});

  if (!deletedTag) {
    res.status(404).json({message: "Could not find tag to delete"});
    return;
  }
  res.status(200).json(deletedTag);
});

module.exports = router;
