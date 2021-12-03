const socket = io("ws://localhost:3000");
socket.on('connect', () => {
  //below is displayed on browser console
  console.log("index.ejs is connected ->")
})
socket.on("time-message", (data) => {
  //visible on browser console only


  const okBtn = (event) => {
    let okBtnClicked = $(event.target);
    let notificationClicked = okBtnClicked.closest(".one-notification").remove();
  }

  const newNotification = function(newNotificationObj) {
    return `<div class="one-notification">
           <div class="notification-text">
          <span>Hello!</span>
          <p>Your order #<span>${newNotificationObj.cartId}</span> is being processed. The estimated time for pick up is in <span>${newNotificationObj.time}</span> minutes. We will notify you again once the food is ready! See you soon!</p>
        </div>
        <footer>
          <button class="ok-btn">OK</button>
        </footer>
      </div>
     `
  }

  $(".notification").prepend(newNotification(data));

  // 'activates submit button when clicked'
  $(".one-notification").find(".ok-btn").on("click", okBtn)
})

socket.on("orderCompleted", (data) => {

  const completedBtn = (event) => {
    let completedBtnClicked = $(event.target);
    let completedNotificationClicked = completedBtnClicked.closest(".one-notification").remove();
  }

  const completedNotification = function(obj) {
    return `<div class="one-notification">
           <div class="notification-text">
          <span>Hello!</span>
          <p>Your order #<span>${obj.cartId}</span> has been completed and its ready for pickup. See you soon!</p>
        </div>
        <footer>
          <button class="ok-btn">OK</button>
        </footer>
      </div>
     `
  }

  $(".notification").prepend(completedNotification(data));
  $(".one-notification").find(".ok-btn").on("click", completedBtn)
});
