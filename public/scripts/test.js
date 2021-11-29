// GRAB THE DATA FROM MY CART

/*
for every cart row, select the
 1) foodName
 2) quantity
 ---------
 select the TOTAL PRICE
 select the NOTES
 ---------
 userID as well

 can I make the above an object ^^^

 const newCartObj = {
   customer_id: user_id
   foodName:quantity
   --pizza: 3
   foorName: quantity
   total_price: total
   notes: notes
 }

*************

let newCartObj = {}

***** newCartObj[customer_id] = user_id


let cartRows = $(".cart-row")

**** cartRows.each(function(index, element) {

  let foodName = $(this).find('.cart-food-name')

  let quantityElement = $(this).find('.quantity').text();
  let quantity = Number(quantityElement);

  newCartObj[foodName] = quantity

})

**** newCartObj["total_price"] = $("#total")
**** newCartObj["notes"] = ***insert id of the input box****


const newCartObj = {
   customer_id: user_id
   foodName:quantity
   --pizza: 3
   foorName: quantity
   price: total
   notes: notes
 }

Queries:

***** INSERTING THE NEW ROW INTO DATABASE FOR THE NEW CART ******
const newCart = (object) => {
  const queryString =
  `
  INSERT INTO carts(user_id, notes)
  VALUES ($1, $2)
  RETURNING *
  `

  const values = [object[user_id], object.notes]

  return connection.query(queryString, values)
    .then(res => res.rows)
    .catch((err) => {
      console.log("Oh no! Error!")
      console.log(err.messae)
      return err.message;
    })


**** ONCE NEW CART IS ADDED TO THE DATABASE, RETREIVE THE cart_id ---- HOW DO WE WANT TO CALL THE FUNCTION/QUERY BASED ON THE NUMBER OF $(CART-ROWS)
const cart_foods = (object) {
  const queryString =
  `
  INSERT INTO cart_foods(cart_id, food_id, qty)
  VALUES ($1, $2, $3)

}


}



 */


