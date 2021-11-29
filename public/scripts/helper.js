const { response } = require("express");

const passwordCheck = function(userPassword, databaseResponse) {
  if (databaseResponse.rowCount === 0) {
    throw new Error(response.status(401));
  } else if (databaseResponse.rows[0].password === userPassword) {
    console.log('Sucess');
    console.log(`/login/${databaseResponse.rows[0].id}`)
    return true;
  } else {
    throw new Error(response.status(401).send('password is not correct'));
  }
}





module.exports = { passwordCheck };
