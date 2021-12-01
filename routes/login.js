const express = require('express');
const router = express.Router();
const userFns = require('../db/queries/users_queries');
const homeFns = require('../db/queries/home_queries');
const helperFns = require('../public/scripts/helper');
const restaurantFns = require('../db/queries/restaurant_queries');
const socket_client = require('../socket-client');
const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


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

router.post('/completed/:id', (req, res) => {
  const response = req.body;
  console.log('we are now in almost the last post in this whole thing', response)
  userFns.completedOrder(response)
    .then(data => {
      socket_client()
        .then((socket) => {
          socket.emit("orderCompleted", response)

          const customerComplete = `Your order ${response.cartId} is ready for pickup. See you soon!`
          return client.messages
            .create({
              body: customerComplete,
              to: process.env.TWILIO_CUSTOMER_PHONE_NUMBER, // Text this number
              from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
            })
            .then((message) => console.log(message.sid))
            .catch(err => console.log(err));
        })
    })
    .catch((err) => {
      console.log("yeah, an error :(")
      console.log(err.message)
    })
});

router.post("/:id", (req, res) => {
  const response = { time: helperFns.minutesFromRestaurant(req.body.time), cartId: req.body.cartId };
  const timeObj = {
    cartId: req.body.cartId,
    time: req.body.time
  };

  console.log("timeOBj------", timeObj);
  console.log('login.js line 41 received from newCart ejs', req.body)

  userFns.updateTime(response)
    .then(data => {
      socket_client()
        .then((socket) => {
          const customerUpdate = `Your order ${timeObj.cartId} is being processed. The estimated time for pick up is in ${timeObj.time} minutes. We will notify you again once the food is ready! See you soon!`


          socket.emit("time-message", timeObj)
          return client.messages
            .create({
              body: customerUpdate,
              to: process.env.TWILIO_CUSTOMER_PHONE_NUMBER, // Text this number
              from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
            })
            .then((message) => console.log(message.sid))
            .catch(err => console.log(err));
        })
    }).catch((err) => {
      console.log("yeah, an error :(")
      console.log(err.message)
    })

})


module.exports = router;








