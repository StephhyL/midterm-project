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

const getUserById = (id) => {
  const values = [id]
  return connection.query(`SELECT * FROM users WHERE id = $1;`, values)
    .then(data => {
      return data.rows[0];

    })
    .catch(err => {
      console.error(err.message);
      return err.message;
    });
};


module.exports = { getUsers, getUserById }
