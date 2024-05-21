const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get route for all categories
router.get('/', async (req, res) => {
  const categories = await Category.findAll({ include: [{ model: Product }] });
  res.status(200).json(categories);
});



// Get a single category
router.get('/:id', async (req, res) => {

  const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

  // Error Handling
  if (!category) {
    res.status(404).json({ message: 'This ID could not be found' });
    return;
  }
  res.status(200).json(category);
});


// Create a new category (using id, category_name in body )
router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);

});



// Update a category, using ID in req.body to identify
router.put('/:id', async (req, res) => {
  const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });

  !updatedCategory[0] ? res.status(404).json({ message: 'This ID could not be found' }) : res.status(200).json(updatedCategory);
});


// Delete a category, using ID in req.body
router.delete('/:id', async (req, res) => {
  const deleted = await Category.destroy({ where: { id: req.params.id } });

  !deleted ? res.status(404).json({ message: 'This ID could not be found' }) : res.status(200).json(deleted);

});

module.exports = router;
