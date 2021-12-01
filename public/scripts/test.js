<<<<<<< HEAD


$(()=> {
  alert("Hello");

  $("#checkout-btn").on("click", function(e){
    console.log("my god");


    // const socket = io("http://localhost:8080");
    // socket.on('connection');

    // socket.on("message", (data) => {
    //  $('#yes').html(data)
    // })

    // const sendMessage = () => {
    //   // const messageInput = $('.hi')
    //   // const message = messageInput.val();
    //   socket.emit('message', "Hi there")
    // }

    // sendMessage();

=======
$(() => {
  alert("Hello");

  $("#checkout-btn").on("click", function(e) {
>>>>>>> master
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


    // console.log(newCartObj["addCart"]);
    // console.log(newCartObj["addCartFoods"]);

    cartRows.each(function(index, element) {
      element.remove();
    })
    updateCartTotal();
    $("#note").val("");



    //once the object is create we need to make an Ajax Call


    cartRows.each(function(index, element) {
      element.remove();
    })
    updateCartTotal();
    $("#note").val("");
    alert('Order has been placed and you will be notified with an estimated time for your order. Thank you for your preference')
    $.post("/newcart", newCartObj);
    /*     .fail(function(res) {
          console.log(res)
          alert("error");
        })
        .always(function(res) {
          console.log(res);
          alert("finished");
        }); */

    /*    $.ajax({
         url: "/newcart",
         data: newCartObj,
         method: "POST",
         success: function() {
           console.log('We should get this consoled');
           alert("The data was posted");
         },
         error: function(err) {
           console.log("There is an error", err.message);
         }
       }); */

  });
});

