const express = require('express');
const router = express.Router();
const restaurantFns = require('../db/queries/restaurant_queries')

router.get("/", (req, res) => {

  //FEEL LIKE SHOULD BE IN THE POST
  restaurantFns.getNewestOrder()
    .then((carts) => {
      const user = null;
      const templateVars = {carts, user}
      res.render('restaurant', templateVars)
    })


  // restaurantFns.getAllCartItems()
  //   .then((carts) => {
  //     const user = null;
  //     res.render('restaurant', { carts, user });
  //   })
});


//route is activated when user clicks CHECKOUT, does something, then REDIRECTS TO "restaurant/" aka GET "/" in this file
router.post("/", (req, res) => {





})





module.exports = router;
