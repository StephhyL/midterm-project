const express = require('express');
const router = express.Router();
const restaurantFns = require('../db/queries/restaurant_queries')

router.get("/", (req, res) => {
  restaurantFns.getRestaurant()//r return either rows or error
    .then((carts) => {
      // res.json({ food_items });
      const user = null;
      res.render('restaurant', { carts, user });
    })
});



module.exports = router;
