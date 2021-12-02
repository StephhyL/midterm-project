$(() => {
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


    let totalElement = $("#total").text();
    let totalPrice = Math.round(Number(totalElement.replace("$", "") * 100));// total price in cents
    newCartObj.addCart["total_price"] = totalPrice;
    newCartObj.addCart["notes"] = $("#note").val();

    cartRows.each(function(index, element) {
      element.remove();
    })
    updateCartTotal();
    $("#note").val("");



    //once the object is create we need to make an Ajax Call
    cartRows.each(function(index, element) {
      element.remove();
    })

    if (totalPrice === 0) {
      return alert('Cart Empty, if you want to make an order you need to add items')
    }

    updateCartTotal();
    $("#note").val("");
    alert('Order has been placed and you will be notified with an estimated time for your order. Thank you for your preference')
    $.post("/newcart", newCartObj)
    /* .done((res) => {
      console.log(`test.js line 49 reached ---------------`)
      window.location.href = '/message'
    }); */
  });
});

