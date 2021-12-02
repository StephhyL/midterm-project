//Can only get access to 'addButtons' once the page has loaded
$(() => {
  const addButtons = $(".add-btn")
  for (let i = 0; i < addButtons.length; i++) {
    let button = addButtons[i];
    button.addEventListener("click", addCartItem)
  }
})

/************* UPDATE CART TOTAL FUNCTIONS ********/
const updateCartTotal = () => {
  let cartRows = $(".cart-row")
  let subtotal = 0;
  // for each row in the cart, retrieve price and quantity (jQuery objects)
  cartRows.each(function() {
    let priceElement = $(this).find('.item-price').text();
    let price = Number(priceElement.replace('$', ''));
    let quantityElement = $(this).find('.quantity').text();
    let quantity = Number(quantityElement);
    subtotal += (price * quantity)
  })
  // updating the prices
  $("#subtotal").text(`$${subtotal}`);
  $("#tax").text(`$${Math.round(subtotal * 0.13) * 100 / 100}`);
  $("#total").text(`$${Math.round((subtotal * 1.13) * 100) / 100}`);

};



/************CREATE ROW DETAILS */
const addRow = (title, food_id, image, price) => {

  const cartFoodNames = $(".cart-food-name")
  for (let i = 0; i < cartFoodNames.length; i++) {
    if (cartFoodNames[i].innerText === title) {
      alert("Item already added to cart");
      return;
    }
  }

  const $pTitle = $("<p>").addClass("cart-food-name").addClass("cart-row-font").text(title);
  const $pFoodId = $("<p>").addClass("cart-food-id").text(food_id)
  const $p = $("<p>").text(image);
  const $divCartItem = $("<div>").addClass("cart-item");
  // appending food name and img into a div
  $divCartItem.append($pTitle, $pFoodId, $p);

  const $pPrice = $("<p>").addClass("item-price").addClass("cart-row-font").text(price);

  const $minusBtn = $("<button>").addClass("minus-btn").text("-");
  const $pQty = $("<p>").addClass("quantity").text(1);
  const $plusBtn = $("<button>").addClass("plus-btn").text("+");
  const $divCounter = $("<div>").addClass("counter");
  // appending buttons and quantity amount
  $divCounter.append($minusBtn, $pQty, $plusBtn);
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

  //current qty of this item in the cart
  let curQty = Number(newRow.find(".quantity").text());
  newRow.find(".minus-btn").on("click", function() {
    if (curQty > 0) {
      curQty--;
      newRow.find(".quantity").text(curQty);
    }
    updateCartTotal();
  })
  newRow.find(".plus-btn").on("click", function() {
    curQty++;
    newRow.find(".quantity").text(curQty);
    updateCartTotal();
  })

}



/************* ADD ITEMS TO CART BUTTON */

const addCartItem = (event) => {

  /****RETRIVING FOODENTITY DETAILS */
  let addbuttonClicked = event.target;
  let foodEntityClicked = addbuttonClicked.closest(".foodEntity");
  let foodName = $(foodEntityClicked).find(".foodName").text();
  let foodId = $(foodEntityClicked).find(".foodId").text();
  let foodImage = $(foodEntityClicked).find(".foodImage").text();
  let foodPrice = $(foodEntityClicked).find(".price").text();

  addRow(foodName, foodId, foodImage, foodPrice);
  updateCartTotal();
}



/*******REMOVE ITEM FUNCTION */
const removeCartItem = (event) => {
  let removeButtonClicked = event.target
  let cartRowClicked = (removeButtonClicked.closest(".cart-row"))
  cartRowClicked.remove();
  updateCartTotal();
}



