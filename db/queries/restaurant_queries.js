const connection = require('../connection');

const getAllCartItems = () => {

  const queryString =
  `
  SELECT *
  FROM carts
  ORDER BY submitted_time DESC
  `

  return connection.query(queryString)
    .then(data => {
      return data.rows;

    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    });
};

const getNewestOrder = () => {

  const queryString =
  `
  SELECT user_id, submitted_time, notes
  FROM carts
  ORDER BY submitted_time
  LIMIT 1;
  `
  return connection.query(queryString)
    .then(data => {
      console.log("data.rows", data.rows)
      return data.rows;
    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    })



}




module.exports = { getAllCartItems, getNewestOrder }
