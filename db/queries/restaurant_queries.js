const connection = require('../connection');

const getRestaurant = () => {
  return connection.query(`SELECT * FROM carts;`)
    .then(data => {
      return data.rows;

    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    });
};


module.exports = { getRestaurant }
