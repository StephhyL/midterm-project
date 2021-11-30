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
      return res.rows[0];
    })
    .catch((err) => {
      console.log("OH NO ERROR")
      console.log(err.message)
      return err.message;
    })
}




const addFoodToCart = (object1, object2) => {
  const queryString =
    `
    INSERT INTO cart_foods(cart_id, food_id, qty_food)
    VALUES
    ($1, $2, $3)
  `;
  for (let foods in object1) {
    const values = [object2.id, object1[foods].id, object1[foods].qty]
    connection.query(queryString, values)
  }
}





module.exports = { getNewCart, addFoodToCart }







