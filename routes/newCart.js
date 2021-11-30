const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')
const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// let createNewCart = require('../scripts/test.js')
const retrieveFoods = (obj) => {
  let foods = '';
  for(let food_item in obj) {
    foods +=  `${obj[food_item].qty} x ${food_item}\n`;
  }
  return foods;
};
router.post("/", (req, res) => {
  // console.log("WE received data",req.body);
  let temp = req.body;
  console.log("req.body---->", temp);
  // console.log(client);

  newCartFns.getNewCart(req.body.addCart)
    .then((new_cart) => {
<<<<<<< HEAD
      console.log("new_cart--->", new_cart);
      newCartFns.addFoodToCart(req.body.addCartFoods, new_cart);
      //tiwilio customer
      //twilio restaurant
      res.send(new_cart)
=======
      console.log("new_cart--->", new_cart)
      newCartFns.addFoodToCart(req.body.addCartFoods, new_cart)
      let customerMessage = `
      Thank you for placing an order with our restaurant.
      Your confirmation number is ${new_cart.id}.
      Your order includes the following items:
      ${retrieveFoods(req.body.addCartFoods)}
      Your total is: $${(new_cart.total_in_cents) / 100}.
      Your notes are: ${new_cart.notes}.
      `;
      let restaurantMessage = `
      An order was placed by customer id: ${req.body.addCart['user_id']}
      The order number is ${new_cart.id}.
      The order includes the following items:
      ${retrieveFoods(req.body.addCartFoods)}
      The total is: $${(new_cart.total_in_cents) / 100}.
      Customers Notes: ${new_cart.notes}.
      `;
      // client.messages
      //   .create({
      //     body: customerMessage,
      //     to: process.env.TWILIO_CUSTOMER_PHONE_NUMBER, // Text this number
      //     from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
      //   })
      //   .then((message) => console.log(message.sid))
      //   .catch(err => console.log(err));
      // client.messages
      //   .create({
      //     body: restaurantMessage,
      //     to: process.env.TWILIO_RESTAURANT_PHONE_NUMBER, // Text this number
      //     from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
      //   })
      //   .then((message) => console.log(message.sid))
      //   .catch(err => console.log(err));
      // res.send(new_cart)
      // res.render('message');
>>>>>>> 8a629e148633aa8f63bcab9108ccfd84f31da5db
    })



  //     return new_cart;
  //   })
});


module.exports = router;
