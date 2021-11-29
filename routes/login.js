const express = require('express');
const router = express.Router();
const userFns = require('../db/queries/users_queries');
const homeFns = require('../db/queries/home_queries')
const { passwordCheck } = require('../public/scripts/helper');


router.post('/', (req, res) => {
  const user = req.body;
  return userFns.getUserByName(user.user)
    .then((data) => {
      if (passwordCheck(user.psw, data)) {
        return res.redirect(`/login/${data.rows[0].id}`)
      }
      res.status(401);
    })
    .catch(err => res.status(401).send(err))
})

router.get("/:id", (req, res) => {
  userFns.getUserById(req.params.id)//r return either rows or error
    .then((user) => {
      homeFns.getHome()
        .then((food_items) => {
          return res.render('index', { user, food_items });
        })
    })
});



module.exports = router;
