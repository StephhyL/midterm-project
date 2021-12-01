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
  let value = [object2.id, object1.id, object1.qty]
  const queryString =
    `
    INSERT INTO cart_foods(cart_id, food_id, qty_food)
    VALUES
    ($1, $2, $3)
  `;
  return connection.query(queryString, value).then(res => {
    console.log(res.rows)
    return res.rows;
  });

  /*  for (let foods in object1) {
     const values = [object2.id, object1[foods].id, object1[foods].qty]
     return connection.query(queryString, values).then(res => res.rows[0]).catch((err) => {
       console.log("OH NO ERROR")
       console.log(err.message)
       return err.message;
     })
   } */
}




const ultimateFoodInsert = function(obj1) {
  let string = `WITH ins1 as ( INSERT INTO carts(user_id, total_in_cents, notes)
VALUES ($1, $2, $3) RETURNING id)
INSERT INTO cart_foods(cart_id, food_id, qty_food)
    VALUES`


  const arry = [obj1.addCart.user_id, obj1.addCart.total_price, obj1.addCart.notes]
  for (let food in obj1.addCartFoods) {
    arry.push(obj1.addCartFoods[food].id)
    arry.push(obj1.addCartFoods[food].qty)
  }
  const valueArr = [];
  for (let i = 0; i < (arry.length - 3) / 2; i++) {
    valueArr.push(`((SELECT id FROM ins1), $${i + 4 + i}, $${i + 5 + i})`);
  }
  const parameterizedValues = valueArr.join(',');
  string += parameterizedValues + 'RETURNING cart_id;';
  console.log(string);
  return connection.query(string, arry).then(res => {
    console.log(res.rows[0])
    return res.rows[0];
  });
}

const getCartById = function(cart_id) {
  return connection.query(`Select * from carts where id = ${cart_id}`)
    .then((final) => final.rows[0]);
}



module.exports = { getNewCart, addFoodToCart, ultimateFoodInsert, getCartById }


/* let arry = [1, 2, 3, 4, 5,6]
for (let food in obj) {

}
for (let i = 0; i < (arry.length-3)/2; i++) {
 console.log(`(select id ins1), ${i+4}, ${i+5}`)
}

 */

