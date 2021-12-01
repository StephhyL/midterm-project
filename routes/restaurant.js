const express = require('express');
const router = express.Router();
const restaurantFns = require('../db/queries/restaurant_queries')

router.get("/", (req, res) => {
  restaurantFns.getNewestOrder()
    .then((carts) => {
      const user = 1;
      const templateVars = { carts, user }
      res.render('restaurant', templateVars)
    })

});



//route is activated when user clicks CHECKOUT, does something
//**but does not redirect to restaurant home because that is only for RESTAURANT OWNER */
router.post("/", (req, res) => {
  // ADD IF STATEMENT. IF NOTHING IN CART, THEN ALERT. OTHERWISE REDIRECT
  res.redirect("/message");

})








module.exports = router;
