const express = require('express');
const router = express.Router();

/***CURRENTLY HAS NO ASSOCIATED QUERIES */

router.get("/", (req, res) => {
  console.log("route reached")
  const user = 2;
  templateVars = {user};
  res.render('message', templateVars);
})




module.exports = router;
