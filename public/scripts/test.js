

$(()=> {
  alert("Hello");

  $("#checkout-btn").on("click", function(e){
    console.log("my god");

    const newCartObj = {
      addCart: {},
      addCartFoods: {}
    };
    newCartObj.addCart["user_id"] = 2;
    // newCartObj[customer_id] = user.id // user inputted that was rendered
    let cartRows = $(".cart-row")
    cartRows.each(function(index, element) {
      //console.log("HELLLO")
      let foodName = $(this).find('.cart-food-name').text()
      let foodId = $(this).find('.cart-food-id').text();
      console.log("foodId------>", foodId);


      let quantityElement = $(this).find('.quantity').text();
      let quantity = Number(quantityElement);
      newCartObj.addCartFoods[foodName] = {  id : foodId, qty : quantity }


    });
    // {addCart: { id, totalPrice, Notes} addcartFoods: {id: idNumber, quantity: quantityNumber}}

    let totalElement = $("#total").text(); //$226
    let totalPrice = Number(totalElement.replace("$", "") * 100) // total price in cents
    newCartObj.addCart["total_price"] = totalPrice;
    newCartObj.addCart["notes"] = $("#note").val();
    console.log(newCartObj["addCart"]);
    console.log(newCartObj["addCartFoods"]);

    //once the object is create we need to make an Ajax Call
    $.ajax({
      url: "/newcart",
      data:  newCartObj,
      //JSON.stringify(newCartObj),
      method: "POST",
      success: function(result){
        alert("The data was posted");
      },
      error: function(err){
        console.log("There is an error",err.message);
      }
    });


  });
});
///
// let data = [
  //{id: 1, name:"rohit"},
  //{id: 2, name:"vandy" }
//]
//We pass the data to the route. Then the route would go through all the data in the form of arry and then then try to insert into table 2 rows 1 by 1
  // const createNewCart = () => {

  //    }
//   });

//     }
// })


// module.exports = { createNewCart }


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


