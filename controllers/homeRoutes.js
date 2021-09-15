const router = require('express').Router();
const { Category, Plant, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Categories and JOIN with plant data

    const categoryData = await Category.findAll({
      include: [
        {
          model: Plant,
          attributes: ['id', 'name', 'category_id', 'owner_id'],
        },
      ],
    });

    console.log('@@@@@@@@@@@' + categoryData);
    // Serialize data so the template can read it
    const Categories = categoryData.map((Category) =>
      Category.get({ plain: true })
    );
    res.json(Categories);

    // Pass serialized data and session flag into template
    /* res.render('categories', {
      Categories,
      logged_in: req.session.logged_in,
    }); */
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/plantProfile');
    res.json({ message: 'loggedin' });
    return;
  }

  res.render('login');
});

module.exports = router;
