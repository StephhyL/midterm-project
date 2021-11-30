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
      //console.log(res.rows);
      return res.rows[0];
    })
    .catch((err)=> {
      console.log("OH NO ERROR")
      console.log(err.message)
      return err.message;
    })
}

/*
req.body.addCartFoods = {
  pizza: 1,
  yogurt: 2
}
*/


const addFoodToCart = (object1, object2) => {

  console.log("object2---->", object2)
  const queryString =
  `
    INSERT INTO cart_foods(cart_id, food_id, qty_food)
    VALUES
    ($1, $2, $3)
  `;
  for (let foods in object1) {
    const values = [object2.id,object1[foods].id, object1[foods].qty]
    connection.query(queryString, values)
  }
  /* addCartFoods = {
    Schnitzel: { id: '10', qty: '2' },
    Yogurt: { id: '9', qty: '1' }
  } */

  // $1 - CART ID
  // for foods in object 1
  /* .id */
  // $2 - FOOD ID
  /// object1.id
  // $3 - QTY_ID
  // object 2.qty

}





module.exports = { getNewCart, addFoodToCart }




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



