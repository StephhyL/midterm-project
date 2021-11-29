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



//route is activated when user clicks CHECKOUT, does something
//**but does not redirect to restaurant home because that is only for RESTAURANT OWNER */
router.post("/", (req, res) => {









  // ADD IF STATEMENT. IF NOTHING IN CART, THEN ALERT. OTHERWISE REDIRECT
  console.log("route reached")
  res.redirect("/message")

})








module.exports = router;
