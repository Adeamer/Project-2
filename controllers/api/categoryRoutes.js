const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all Categories and JOIN with plant data

    const categoryData = await Category.findAll({
      where: {
        owner_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const allCategories = categoryData.map((Category) =>
      Category.get({ plain: true })
    );
    console.log(allCategories);
    console.log('Session id is : ' + req.session.user_id);
    //res.json(allCategories);

    // Pass serialized data and session flag into template

    res.render('category', {
      allCategories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newCategory = await Category.create({
      ...req.body,
      owner_id: req.session.user_id,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
