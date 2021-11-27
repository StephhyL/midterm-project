const express = require('express');
const router = express.Router();
const homeFns = require('../db/queries/home_queries')

router.get("/", (req, res) => {
  homeFns.getHome()//r return either rows or error
    .then((food_items) => {
      res.json({ food_items });
    })
});



module.exports = router;
