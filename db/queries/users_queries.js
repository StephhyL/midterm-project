const connection = require('../connection');

const getUsers = () => {
  return connection.query(`SELECT * FROM users;`)
    .then(data => {
      return data.rows;

    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    });
};


module.exports = { getUsers }
