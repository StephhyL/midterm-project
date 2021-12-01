const express = require('express');
const router = express.Router();
const userFns = require('../db/queries/users_queries');
const homeFns = require('../db/queries/home_queries');
const helperFns = require('../public/scripts/helper');
const restaurantFns = require('../db/queries/restaurant_queries');
const socket_client = require('../socket-client');


router.post('/', (req, res) => {
  const user = req.body;
  return userFns.getUserByName(user.user)
    .then((data) => {
      if (helperFns.passwordCheck(user.psw, data)) {
        return res.redirect(`/login/${data.rows[0].id}`)
      }
      res.status(401);
    })
    .catch(err => res.status(401).send(err))
})

router.get("/:id", (req, res) => {
  userFns.getUserById(req.params.id)
    .then((user) => {
      if (!helperFns.adminOrCustomer(user.id)) {
        homeFns.getHome()
          .then((food_items) => {
            return res.render('index', { user, food_items });
          })
      } else {
        restaurantFns.getNewestOrder()
          .then((carts) => {
            const templateVars = { carts, user }
            return res.render('restaurant', templateVars)
          })
      }
    })
});

router.post("/:id", (req, res) => {
  console.log("req.body", req.body)
  socket_client()
    .then((socket)=> {
      let customerNotificationMessage = req.body;
      // console.log(customerNotificationMessage, "customerNotificationMessage")
      console.log("reached socket in POST of /login/:d in login js--->")
      socket.emit("time-message", customerNotificationMessage)
    })
    .catch((err)=> {
      console.log("yeah, an error :(")
      console.log(err.message)
    })
})


module.exports = router;
