const express = require('express');
const router = express.Router();
const homeFns = require('../db/queries/home_queries')

router.get("/", (req, res) => {
  homeFns.getHome()//r return either rows or error
    .then((food_items) => {
      // res.json({ food_items });
      const user = 1;
      res.render('index', { food_items, user });
    })
});



module.exports = router;
