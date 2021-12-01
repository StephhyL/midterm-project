const { response } = require("express");

const passwordCheck = function(userPassword, databaseResponse) {
  if (databaseResponse.rowCount === 0) {
    throw new Error(response.status(401));
  } else if (databaseResponse.rows[0].password === userPassword) {
    return true;
  } else {
    throw new Error(response.status(401).send('password is not correct'));
  }
}

const adminOrCustomer = function(id) {
  if (id === 1) {
    return true;
  }
  return false;
}

const newOrder = function(orderObj) {
  return `
  <div class="one-order">
    <div class="order-details">
      <div class="user-details">
        <div>
            <span>Customer ID: </span>
            <p> ${orderObj.customerId}</p>
        </div>
        <div>
            <span>Time of Order Placement:</span>
            <p>${orderObj.time}</p>
        </div>
      </div>
      <div class="food-details">
        <span>Food to Prepare:</span>
        <span>${orderObj.listOfFoods}</span>
        <span> Total</span>
        <span> ${orderObj.total} </span>
      </div>
      <div class="note-details">
        <span>Customer Notes:</span>
        <p>${orderObj.notes}</p>
      </div>
    </div>
    <div class="time-container">
      <form>
        <textarea type="text" class="estimated-time" name="estimated-time"></textarea>
      </form>
      <button type="submit" class="submit-btn"> Submit</button>
    </div>
    <div class="div-check">
        <input type="checkbox"/>
    </div>
  </div>`
};


const minutesFromRestaurant = function(minutes) {
  let secs = 60;
  return minutes * secs;
}



module.exports = { passwordCheck, adminOrCustomer, newOrder, minutesFromRestaurant };
