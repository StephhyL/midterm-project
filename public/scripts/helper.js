const { response } = require("express");

const passwordCheck = function(userPassword, databaseResponse) {
  if (databaseResponse.rowCount === 0) {
    throw new Error(response.status(401));
  } else if (databaseResponse.rows[0].password === userPassword) {
    return true;
  } else {
    throw new Error(response.status(401).send('password is not correct'));
  }
}

const adminOrCustomer = function(id) {
  if (id === 1) {
    return true;
  }
  return false;
}




module.exports = { passwordCheck, adminOrCustomer };
