// Client facing scripts here

$(() => {


/************CREATE ROW DETAILS */
const addRow = (title, image, price) => {

  const cartFoodNames = $(".cart-food-name")
  for (let i=0; i<cartFoodNames.length; i++) {
    if(cartFoodNames[i].innerText === title) {
      alert("Item already added to cart");
      return;
    }
  }

  const $h4 = $("<h4>").addClass("cart-food-name").text(title);
  const $p = $("<p>").text(image);
  const $divCartItem = $("<div>").addClass("cart-item");
  // appending food name and img into a div
  $divCartItem.append($h4, $p);

  const $pPrice = $("<p>").addClass("item-price").text(price);

  const $minusBtn = $("<button>").addClass("minus-btn").text("-");
  const $spanQty = $("<span>").addClass("quantity").text(1);
  const $plusBtn = $("<button>").addClass("plus-btn").text("+");
  const $divCounter = $("<div>").addClass("counter");
  // appending buttons and quantity amount
  $divCounter.append($minusBtn, $spanQty, $plusBtn);
  const $rmBtn = $("<button>").addClass("remove-btn").text("Remove");
  const $divRemove = $("<div>")
  //appending remove button to a div
  $divRemove.append($rmBtn);

  const $divCartQty = $("<div>").addClass("cart-quantity")
  //appending -/+ and remove button divs
  $divCartQty.append($divCounter, $divRemove)

  const $cartRow = $("<div>").addClass("cart-row")
  //appending all three columns/divs
  let newRow = $cartRow.append($divCartItem, $pPrice, $divCartQty)

  //appending new cart row to the end of the cartlist
  $("#cartList").append(newRow);

  // 'activates remove button when clicked'
  newRow.find(".remove-btn").on("click", removeCartItem)

  }
})


