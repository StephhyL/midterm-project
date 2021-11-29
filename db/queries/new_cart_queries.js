const connection = require('../connection');


const getNewCart = (object) => {
  const queryString =
  `
  INSERT INTO carts(user_id, total_in_cents, notes)
  VALUES ($1, $2, $3)
  RETURNING *
  `

  const values = [object["user_id"], object["total_price"], object.notes]

  return connection.query(queryString, values)
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err)=> {
      console.log("OH NO ERROR")
      console.log(err.message)
      return err.message;
    })



}

// const getNewCart = () => {
//   return connection.query(`SELECT * FROM food_items;`)
//     .then(data => {
//       return data.rows;

//     })
//     .catch(err => {
//       console.error(err.message);
//       return err.message;
//     });
// };


module.exports = { getNewCart }
