const router = require('express').Router();
const { Category, Plant, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Categories and JOIN with plant data

    const categoryData = await Category.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'fname', 'lname'],
        },
      ],

      where: {
        owner_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const Categories = categoryData.map((Category) =>
      Category.get({ plain: true })
    );
    //res.json(Categories);

    // Pass serialized data and session flag into template

    res.render('category', {
      Categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    res.json({ message: 'loggedin' });
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    res.json({ message: 'loggedin' });
    return;
  }

  res.render('signup');
});

module.exports = router;
