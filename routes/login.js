const express = require('express');
const router = express.Router();
const userFns = require('../db/queries/users_queries')

router.get("/:id", (req, res) => {
  userFns.getUserById(req.params.id)//r return either rows or error
    .then((user) => {
      console.log(user);
      return res.render('index', { user });
    })
});



module.exports = router;
