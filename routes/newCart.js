const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')

router.get("/", (req, res) => {
  newCartFns.getNewCart(newCartObj)//r return either rows or error
    .then((food_items) => {
      // res.json({ food_items });
      const user = null;
      res.render('index', { food_items, user });
    })
});



module.exports = router;
