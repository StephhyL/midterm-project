const express = require('express');
const router = express.Router();
const homeFns = require('../db/queries/home_queries')

router.get("/", (req, res) => {
  homeFns.getHome()
    .then((food_items) => {
      const user = null;
      res.render('index', { food_items, user });
    })
});



module.exports = router;
