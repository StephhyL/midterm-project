$(()=> {

  $("#submit-btn").on("click", function(e) {
    const estTime = $("#estimated-time").val();
    console.log(estTime);
    const estTimeMessage = `Your order is estimated to be ready in ${estTime} minutes. We will notify you again when the order is actually ready! Stay tuned!`

    console.log("estTimeMessage---->",estTimeMessage);

    $.post("/login/2", estTimeMessage);

  })

})
