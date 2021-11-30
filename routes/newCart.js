const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')
// let createNewCart = require('../scripts/test.js')

router.post("/", (req, res) => {
  // console.log("WE received data",req.body);
  let temp = req.body;
  console.log("req.body---->", temp);

  newCartFns.getNewCart(req.body.addCart)
    .then((new_cart) => {
      console.log("new_cart--->", new_cart)
      newCartFns.addFoodToCart(req.body.addCartFoods, new_cart)
      res.send(new_cart)
    })


  //     return new_cart;
  //   })
});


module.exports = router;
