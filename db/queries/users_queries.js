const connection = require('../connection');
const { response } = require('express');

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

const getUserByName = (user) => {
  const value = [user];
  return connection.query(`SELECT * FROM users WHERE name = $1;`, value)
    .then(data => { return data });
}
module.exports = { getUsers, getUserById, getUserByName }
