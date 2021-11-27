const connection = require('../connection');

const getHome = () => {
  return connection.query(`SELECT * FROM food_items;`)
    .then(data => {
      return data.rows;

    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    });
};


module.exports = { getHome }
