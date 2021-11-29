const express = require('express');
const router = express.Router();
const newCartFns = require('../db/queries/new_cart_queries')
// let createNewCart = require('../scripts/test.js')

router.post("/", (req, res) => {
  // console.log("WE received data",req.body);
  newCartFns.getNewCart(req.body)
    .then((new_cart) => {
      res.send(new_cart);
    })
});


module.exports = router;
