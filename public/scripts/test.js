$(() => {
  alert("Hello");

  $("#checkout-btn").on("click", function(e) {
    const newCartObj = {
      addCart: {},
      addCartFoods: {}
    };
    newCartObj.addCart["user_id"] = 2;
    let cartRows = $(".cart-row")
    cartRows.each(function() {
      let foodName = $(this).find('.cart-food-name').text()
      let foodId = $(this).find('.cart-food-id').text();


      let quantityElement = $(this).find('.quantity').text();
      let quantity = Number(quantityElement);
      newCartObj.addCartFoods[foodName] = { id: foodId, qty: quantity }
    });


    let totalElement = $("#total").text(); //$226
    let totalPrice = Math.round(Number(totalElement.replace("$", "") * 100)); // total price in cents
    newCartObj.addCart["total_price"] = totalPrice;
    newCartObj.addCart["notes"] = $("#note").val();
    console.log(newCartObj["addCart"]);
    console.log(newCartObj["addCartFoods"]);

    //once the object is create we need to make an Ajax Call
    $.ajax({
      url: "/newcart",
      data: newCartObj,
      method: "POST",
      success: function() {
        alert("The data was posted");
      },
      error: function(err) {
        console.log("There is an error", err.message);
      }
    });

  });
});

