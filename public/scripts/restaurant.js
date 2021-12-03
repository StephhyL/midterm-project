

const socket = io("ws://localhost:3000");
socket.on('connect', () => {
  console.log("restaurant.ejs is connected")
})
socket.on("inputValue", (data) => {

  //SUBMIT BUTTON THAT TRIGGERS AJAX POST REQUEST
  const submitTime = (event) => {
    let submitBtnClicked = $(event.target);
    submitBtnClicked.css("background-color", "red");
    let estTime = submitBtnClicked.closest(".time-container").find(".estimated-time").val();

    $.post("/login/2", { time: estTime, cartId: data.cartId });
  };

  const newOrder = function(orderObj) {
    return `
  <div class="one-order">
    <div class="user-details">
      <div>
          <span>Customer ID: </span>
          <p> ${orderObj.customerId}</p>
      </div>
      <div>
        <span>Order ID: </span>
        <p> ${orderObj.cartId}</p>
      </div>
      <div>
        <span>Time of Order Placement:</span>
        <p>${orderObj.time}</p>
      </div>
    </div>

    <div class='parent-container'>
      <div class="order-details">
        <div class="food-details">
          <span>Food to Prepare:</span>
          <br>
          <span>${orderObj.listOfFoods}</span>
          <br>
          <br>
          <span> Total: </span>
          <span> ${orderObj.total} </span>
        </div>
        <div class="note-details">
          <span>Customer Notes:</span>
          <p>${orderObj.notes}</p>
        </div>
      </div>



        <div class='sibling-container'>
            <div class="time-container">
              <form>
                <textarea type="text" class="estimated-time" name="estimated-time"></textarea>
              </form>
              <button type="submit" class="submit-btn"> Submit</button>
            </div>
            <div class="div-check">
                <input class="checkbox-btn"type="checkbox"/>
            </div>
        </div>
    </div>

  </div>`
  };


  $(".order-list").prepend(newOrder(data));

  // 'activates submit button when clicked'
  $(".one-order").find(".submit-btn").on("click", submitTime)




  //SUBMIT BUTTON THAT TRIGGERS AJAX POST REQUEST
  const completedOrder = (event) => {
    let checkboxClicked = $(event.target).css("background-color", "red");
    console.log('Comes from restaruant.ejs when clicked checkbox ', data);
    $.post(`/login/completed/${data.customerId}`, { userId: data.customerId, cartId: data.cartId });
  };

  //  Chebox completed sends message.
  $(".one-order").find(".checkbox-btn").on("click", completedOrder)
})
