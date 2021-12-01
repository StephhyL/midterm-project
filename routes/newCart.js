const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')
const twilio = require('twilio'); //Twilio sms api
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const socket_client = require('../socket-client');

//**SOCKET */
// const io = require("socket.io-client");
// const socket = io("ws://localhost:3000");
// socket.on('connection', function() {
//   console.log("CONNNECCCTED HERE.")
// });


// let createNewCart = require('../scripts/test.js')
const retrieveFoods = (obj) => {
  let foods = '';
  for (let food_item in obj) {
    foods += `${obj[food_item].qty} x ${food_item}\n`;
  }
  return foods;
};


router.post("/", (req, res) => {
  let temp = req.body;

  console.log('this is post', temp);
  newCartFns.ultimateFoodInsert(temp).then(resp => {
    return newCartFns.getCartById(resp.cart_id)

  })
    .then((data) => {
      console.log(data)
      let customerMessage = `
    Thank you for placing an order with our restaurant.
    Your confirmation number is ${data.id}.
    Your order includes the following items:
    ${retrieveFoods(temp.addCartFoods)}
    Your total is: $${(data.total_in_cents) / 100}.
    Your notes are: ${data.notes}.
    `;
      let restaurantMessage = `
      An order was placed by customer id: ${req.body.addCart['user_id']}
      The order number is ${data.id}.
      The order includes the following items:
      ${retrieveFoods(req.body.addCartFoods)}
      The total is: $${(data.total_in_cents) / 100}.
      Customers Notes: ${data.notes}.
      `;

      // socket.on("message", (data) => {
      //  $('#yes').html(data)
      // })

      // const sendMessage = () => {
        // const messageInput = $('.hi')
        // const message = messageInput.val();
      //   console.log("send message function")
      //   socket_client().then((socket)=> {
      //     console.log("yes, inside the socket_client")
      //     socket.emit("inputValue", restaurantMessage)
      //   })
      //   // socket.emit('message', restaurantMessage)
      // }

      // sendMessage();


      // console.log("send message function")
      socket_client()
      .then((socket)=> {
        console.log("yes, inside the socket_client")
        socket.emit("inputValue", restaurantMessage)
      })
      .catch((err)=> {
        console.log("yeah, an error :(")
        console.log(err.message)
      })

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
    })
    .catch(err => console.log(err.message))
});


module.exports = router;













/*     .then((new_cart) => {
      console.log('this is new_cart : ', new_cart);
      for (let foodItems in req.body.addCartFoods) {
        newCartFns.addFoodToCart(req.body.addCartFoods[foodItems], new_cart)
      } */
/*       newCartFns.addFoodToCart(req.body.addCartFoods, new_cart) */

/*         .then((data) => {
          console.log(data);
          res.json(data);
          console.log('this is addFoodToCart : ');
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
        }) */
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
/*  }) */
