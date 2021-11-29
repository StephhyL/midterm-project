const express = require('express');
const router = express.Router();
const userFns = require('../db/queries/users_queries');
const homeFns = require('../db/queries/home_queries')


router.get("/:id", (req, res) => {
  userFns.getUserById(req.params.id)//r return either rows or error
    .then((user) => {
      console.log(user);
      homeFns.getHome()
        .then((food_items) => {
          return res.render('index', { user, food_items });
        })
    })
});



module.exports = router;
