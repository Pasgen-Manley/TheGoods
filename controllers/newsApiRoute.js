const router = require('express').Router();
const axios = require('axios').default;
const { User, Article, Category } = require('../models');
const withAuth = require('../utils/auth');


router.get('/discover', withAuth, async (req, res) => {
  let url;
  console.log("hello", req.query);
  if(req.query.title) {
    url = "https://newsapi.org/v2/everything?q=" + req.query.title + "&pageSize=8&apiKey=596d896758df478f8836a97d5d0931c9";
  } else {
    url = "https://newsapi.org/v2/everything?q=keyword&pageSize=8&apiKey=596d896758df478f8836a97d5d0931c9"
  }
  axios.get(url)
  .then (function(response) {
    // handle success
   // console.log(response.data);

    const userData = User.findByPk(req.session.user_id, {
      where: {
        user_id: req.session.id,
      },
			attributes: { exclude: [ 'password' ] },
			include: [ { model: Category } ]
		});

		//const user = userData.get({ plain: true });
    //res.send(response.data);
    res.render('discover', {
      articles: response.data.articles,
      categories: userData.categories,
      logged_in: req.session.logged_in
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

module.exports = router;