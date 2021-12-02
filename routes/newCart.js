const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')
const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const socket_client = require('../socket-client');


const retrieveFoods = (obj) => {
  let foods = '';
  for (let food_item in obj) {
    foods += `${obj[food_item].qty} x ${food_item}\n`;
  }
  return foods;
};


router.post("/", (req, res) => {
  let temp = req.body;

  newCartFns.ultimateFoodInsert(temp).then(resp => {
    return newCartFns.getCartById(resp.cart_id)

  })
    .then((data) => {
      let customerMessage = `
      Thank you for placing an order with our restaurant.
      Your confirmation number is ${data.id}.
      Your order includes the following items:
      ${retrieveFoods(temp.addCartFoods)}
      Your total is: $${(data.total_in_cents) / 100}.
      Your notes are: ${data.notes}.
      `;
      let restaurantMessage = `
      An order was placed by customer id: ${req.body.addCart['user_id']}.
      The order number is ${data.id}.
      The order includes the following items:
      ${retrieveFoods(req.body.addCartFoods)}
      The total is: $${(data.total_in_cents) / 100}.
      Customers Notes: ${data.notes}.
      `;
      const orderObj = {
        cartId: data.id,
        customerId: temp.addCart['user_id'],
        time: data.submitted_time,
        listOfFoods: retrieveFoods(temp.addCartFoods),
        notes: data.notes,
        total: (data.total_in_cents) / 100
      }

      socket_client()
        .then((socket) => {
          socket.emit("inputValue", orderObj)
        })
        .catch((err) => {
          console.log("yeah, an error :(")
          console.log(err.message)
        })

      client.messages
        .create({
          body: customerMessage,
          to: process.env.TWILIO_CUSTOMER_PHONE_NUMBER,
          from: process.env.TWILIO_PHONE_NUMBER,
        })
        .then((message) => console.log(message.sid))
        .catch(err => console.log(err));
      client.messages
        .create({
          body: restaurantMessage,
          to: process.env.TWILIO_RESTAURANT_PHONE_NUMBER,
          from: process.env.TWILIO_PHONE_NUMBER,
        })
        .then((message) => console.log(message.sid))
        .catch(err => console.log(err));
      res.send(null);
    })
    .catch(err => console.log(err.message))
});


module.exports = router;












