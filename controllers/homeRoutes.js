const router = require('express').Router();
const { User, Article, Category } = require('../models');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get('/', (req, res) => {
	if (req.session.logged_in) {
	  res.redirect('/homepage');
	  return;
	}
	else (!req.session.logged_in)  
	res.render('login');
  });  

router.get('/homepage', async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: [ 'password' ] },
			include: [ { model: Category } ]
		});

		const user = userData.get({ plain: true });
		
		//const articleData = await article.findAll({
		//	include: [
		//		{
		//			model: User,
		//			attributes: [ 'username' ]
		//		}
		//	],
		//	order: [ [ 'id', 'ASC' ] ]
		//});

		//const articles = articleData.map((blog) => articles.get({ plain: true }));

		res.render('homepage', {
			categories: user.categories,
			//articles,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/login', (req, res) => {
	// If a session exists, redirect the request to the homepage
	if (req.session.logged_in) {
		res.redirect('/homepage');
		return;
	}

	res.render('login');
});

router.get('/register', (req, res) => {
	// If a session exists, redirect the request to the login page
	if (req.session.logged_in) {
		res.redirect('/homepage');
		return;
	}

	res.render('register');
});

router.get('/categories', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: [ 'password' ] },
			include: [ { model: Category } ]
		});

		const user = userData.get({ plain: true });
		console.log(userData)

		res.render('categories', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/remove', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: [ 'password' ] },
			include: [ { model: Category } ]
		});

		const user = userData.get({ plain: true });
		console.log(userData)

		res.render('remove', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/categories/:id', async (req, res) => {
	try {
		const categoryData = await user.findByPk(req.params.id, {
			include: [
				{
					model: Category
				},
				{
					model: User,
					attributes: [ 'username' ]
				}
			]
		});

		const category = categoryData.get({ plain: true });
		console.log(category);
		res.render('category', {
			...category
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/categories/article/:id', async (req, res) => {
	try {
		const articleData = await user.findByPk(req.params.id, {
			include: [
				{
					model: Article
				},
				{
					model: User,
					attributes: [ 'username' ]
				}
			]
		});

		const article = articleData.get({ plain: true });
		console.log(article);
		res.render('article', {
			...article
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
