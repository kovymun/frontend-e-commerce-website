/** THE SPICE PANTRY - SHOPPING CART JAVASCRIPT FILE **/
/* This JS file renders elements and components of the shopping cart page. */

//Basket array with product data stored in localStorage.
let basket = JSON.parse(localStorage.getItem("products")) || [];

// Retrieving the shopping cart element.
let shoppingCart = document.getElementById("cart-details");

// Retrieving table elements for displaying cart items and order summary.
let cartItemTable = document.getElementById("purchase-summary-table-data");
let orderSummaryTable = document.getElementById("order-summary-table-data");

/* 
GENERATING CART ITEMS:
* Function to generate and display each product item added to the shopping cart.
* Uses data from the basket array to populate the data.
*/
function generateCartItems() {
  if (basket.length !== 0) {
    //HTML structure for each cart item
    return (cartItemTable.innerHTML = basket
      .map((product) => {
        let { id, numberOfItems } = product;
        let searchProduct =
          shopItems.find((productItem) => productItem.id === id) || [];
        return `
          <tr
            id="cart-purchase-summary-row"
            class="cart-purchase-summary-row"
          >
        <td>${searchProduct.name}</td>
        <td>
          <div class="cart-item-qty">
            <i onclick="decrementQty(${id})" id="minus" class="minus d-inline-block bi bi-dash-lg"></i>
            <div id="${id}" class="cart-item-count d-inline-block">${numberOfItems}</div>
            <i onclick="incrementQty(${id})" id="plus" class="plus d-inline-block bi bi-plus-lg"></i>
          </div>
        </td>
        <td class="table-data-item-price">R${searchProduct.price}</td>
        <td class="table-data-total-price">R${
          numberOfItems * searchProduct.price
        }</td>
        <td>
          <span onclick="removeCartItem(${id})" class="app-btn remove-cart-item-btn">REMOVE</span>
        </td>
      </tr>
      `;
      })
      .join(""));
  } else {
    //HTML structure / display message when the cart is empty.
    shoppingCart.innerHTML = `
      <div
        class="app-content-container row mb-5 g-0 align-items-md-stretch"
      >
        <div class="col-lg-5 col-md-6 align-items-md-stretch">
          <img
            class="testimonial-img img-fluid object-fit-cover w-100 h-100"
            src="../images/app_images/empty-basket.jpg"
          />
        </div>
        <div
          class="col-lg-7 col-md-6 p-4 d-flex justify-content-center align-items-center flex-column"
        >
          <h4 class="text-center mb-3">Your Shopping Cart is Empty!</h4>
          <a
             class="app-btn empty-cart-cont-shopping-link"
            href="products.html"
          >CONTINUE SHOPPING</a
          >
        </div>
      </div>
  `;
  }
}

//Invoking the generateCartItems() function to display the cart items.
generateCartItems();

/* INCREMENT, DECREMENT AND UPDATE BUTTON FUNCTIONS */
//Function to increment the quantity of selected products item in the shopping cart
function incrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  if (searchProduct === undefined) {
    basket.push({
      id: selectedProduct.id,
      numberOfItems: 1,
    });
  } else {
    searchProduct.numberOfItems += 1;
  }

  // Updating cart, total purchase amount, and local storage
  qtyUpdate(selectedProduct.id);
  generateCartItems();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

//Function to decrement the quantity of selected products item in the shopping cart
function decrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  if (searchProduct === undefined) {
    return;
  } else if (searchProduct.numberOfItems === 0) {
    return;
  } else {
    searchProduct.numberOfItems -= 1;
  }

  //Updating cart, total purchase amount, and local storage
  qtyUpdate(selectedProduct.id);
  basket = basket.filter((productItem) => productItem.numberOfItems !== 0);
  generateCartItems();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
}

//Function to update the quantity and display the number of items, per product item, added to each cart item.
function qtyUpdate(id) {
  let searchProduct = basket.find((productItem) => productItem.id === id);
  document.getElementById(id).innerHTML = searchProduct.numberOfItems;
  iconCalculation();
}

/*
REMOVING A CART ITEM:
* Function to remove / delete a cart item when the "REMOVE" button is clicked.
*/
function removeCartItem(id) {
  let selectedCartItem = id;
  basket = basket.filter(
    (productItem) => productItem.id !== selectedCartItem.id
  );

  //Updating cart, total purchase amount, cart icon(count), and local storage.
  generateCartItems();
  iconCalculation();
  totalPurchaseAmount();
  localStorage.setItem("products", JSON.stringify(basket));
  tableScroll();
}

/*
 * Function to calculate and display the total number of items in the shopping cart.
 * Updates both the "navbar shopping cart icon" and the "responsive cart navigation link icon".
 * For readability purposes, the accumulator (x) and the current iteration item value (y) are labeled as x and y respectively in the reduce function.
 */

function iconCalculation() {
  //Retrieving elements for displaying the total number of items in the shopping cart.
  let cartIcon = document.getElementById("cart-qty");
  let responsiveCartTotal = document.getElementById("responsive-cart-total");

  //Hamburger menu asterisk icon, which indicates that there are items in the shopping cart.
  let hamburgerMenuAsterisk = document.getElementById(
    "hamburger-menu-bi-asterisk"
  );

  //Calculate the total number of items in the shopping cart.
  let totalNoBasketItems = basket
    .map((products) => products.numberOfItems)
    .reduce((x, y) => x + y, 0);

  //Updating the innerHTML of the "navbar shopping cart icon" with total number of items in the shopping cart.
  cartIcon.innerHTML = totalNoBasketItems;

  //Verify if the basket is not empty.
  if (basket.length > 0) {
    //Updating the innerHTML of the "responsive cart navigation link icon" with total number of items in the shopping cart.
    responsiveCartTotal.innerHTML = totalNoBasketItems;

    //Adding the respective classes for styling.
    responsiveCartTotal.classList.add("responsive-cart-total");
    hamburgerMenuAsterisk.classList.add(
      "hamburger-menu-bi-asterisk",
      "bi",
      "bi-asterisk"
    );
  } else {
    responsiveCartTotal.classList.remove("responsive-cart-total");
    hamburgerMenuAsterisk.classList.remove(
      "hamburger-menu-bi-asterisk",
      "bi",
      "bi-asterisk"
    );
    responsiveCartTotal.innerHTML = "";
  }
}

//Invoking the iconCalculation() function to update the navbar shopping cart icon and responsive cart navigation link icon count.
iconCalculation();

/*
CLEARING THE SHOPPING CART:
* This function clears the contents of shopping cart items.
*/
function clearShoppingCart() {
  basket = []; //Setting the basket to an empty array.
  iconCalculation(); //Updating the cart icon (count).
  generateCartItems(); //Regenerating the shopping cart items.
  totalPurchaseAmount(); //Recalculating total purchase amount.
  localStorage.setItem("products", JSON.stringify(basket)); //Updating basket / local storage.
}

/* DELIVERY OPTION SECTION OF THE SHOPPING CART */
/*
 * The application presents the user with two options for product collection: "in-store collection" or "delivery service" provided by THE SPICE PANTRY.
 * The delCostCalculation function calculates the costs associated with the user's selection, including the delivery method chosen and any associated fees.
 */

//Retrieving the elements related to delivery options.
const delSelectMenuContainer = document.getElementById(
  "del-select-menu-container"
);
const delSelectMenu = document.getElementById("del-selection");

function delCostCalculation() {
  const storeCollectionRadioBtn = document.getElementById("del-collection");

  //Initializing delivery cost and type variables.
  let deliveryCost = 0;
  let deliveryType = "";

  //Handling user product collection selection.
  if (storeCollectionRadioBtn.checked === true) {
    delSelectMenuContainer.style.display = "none";
    deliveryCost = 0;
    deliveryType = "In-store Collection";
  } else {
    delSelectMenuContainer.style.display = "block";

    //Determine delivery cost and type based on selected option
    if (delSelectMenu.value === "same-day") {
      deliveryCost = 100;
      deliveryType = "Same-Day Express";
    } else if (delSelectMenu.value === "overnight") {
      deliveryCost = 85;
      deliveryType = "Overnight Express";
    } else if (delSelectMenu.value === "standard-del") {
      deliveryCost = 0;
      deliveryType = "Standard Delivery";
    }
  }

  //Returning delivery cost and type
  return {
    deliveryCost: deliveryCost,
    deliveryType: deliveryType,
  };
}

/* CALCULATING AND DISPLAYING THE TOTAL PURCHASE AMOUNT */
/*
 * The totalPurchaseAmount function calculates and displays the total purchase amount due by the customer.
 * This includes the Total Amount, Items total, V.A.T and the delivery fees.
 */
function totalPurchaseAmount() {
  if (basket.length !== 0) {
    //Calculating the total amount of items (less V.A.T)
    let itemsTotal = basket
      .map((product) => {
        let { numberOfItems, id } = product;
        let searchProduct =
          shopItems.find((productItem) => productItem.id === id) || [];
        return numberOfItems * searchProduct.price;
      })
      .reduce((x, y) => x + y, 0)
      .toFixed(1);

    //Calculating the total V.A.T
    let vatTotal = basket
      .map((product) => {
        let { numberOfItems, id } = product;
        let searchProduct =
          shopItems.find((productItem) => productItem.id === id) || [];
        let vatAmt = searchProduct.price * 0.15;
        return numberOfItems * vatAmt;
      })
      .reduce((x, y) => x + y, 0)
      .toFixed(1);

    //Calculating delivery options and related costs / charges.
    let delivery = delCostCalculation();
    let deliveryChoice = delivery.deliveryType;
    let deliveryCharges = delivery.deliveryCost.toFixed(1);

    //Calculating the total purchase amount.
    let totalAmount = (
      Number(itemsTotal) +
      Number(vatTotal) +
      Number(deliveryCharges)
    ).toFixed(1);

    //HTML structure for displaying the calculated values in the order summary table.
    orderSummaryTable.innerHTML = `
    <tr>
    <td>Order Total</td>
    <td></td>
    <td></td>
    <td>R${totalAmount}</td>
  </tr>
  <tr>
    <td>Items Total</td>
    <td></td>
    <td></td>
    <td>R${itemsTotal}</td>
  </tr>
  <tr>
    <td>V.A.T</td>
    <td></td>
    <td></td>
    <td>R${vatTotal}</td>
  </tr>
  <tr>
    <td>Delivery Charges</td>
    <td class="user-delivery-selection">(${deliveryChoice})</td>
    <td></td>
    <td>R${deliveryCharges}</td>
  </tr>`;

    return totalAmount; //Return totalAmount value
  } else return;
}

//Invoking the function to display the calculated total order amounts.
totalPurchaseAmount();

/*
GENERATING THE PAYMENT PAGE:
* This function generates and displays the payment page when the user proceeds to "checkout".
* The payment page allows customers to complete their purchase by entering their delivery and billing address along with their card payment details.
* DISCLAIMER: Please note that the input fields on this payment page are for aesthetic purposes only and do not store or validate user inputs. 
  Functionality and input validation will be implemented in future revisions.
*/
function paymentPage() {
  const paymentPageContainer = document.getElementById(
    "payment-page-container"
  );

  //Adding CSS classes to display the payment page.
  paymentPageContainer.classList.add("info-message-container");
  paymentPageContainer.classList.remove("info-message-container-hidden");

  const totalAmount = totalPurchaseAmount();

  //HTML structure for the payment page.
  paymentPageContainer.innerHTML = `
  <div
    id="payment-page-content"
    class="info-message-content payment-page my-3"
  >
    <!-- Payment Page Title and Intro -->
    <h3 class="mb-3">Complete Your Purchase</h3>

    <p class="payment-page-intro">
      Thank you for shopping with us! Please review and complete the
      following details to finalize your purchase.
    </p>

    <!-- Total Amount Due -->
    <div class="billing-amt-container mb-4">
      <p class="billing-amt-title">TOTAL AMOUNT :</p>
      <p id="total-billing-amt" class="total-billing-amt">R${totalAmount}</p>
    </div>

    <!-- Sub-section: Customer Delivery and Billing information -->
    <div class="delivery-billing-info-container mb-3">
      <h5>Delivery & Billing Information:</h5>

      <p>
        Please provide your delivery and billing details below to ensure
        accurate delivery of your order.
      </p>

      <form class="checkout-form">
        <!-- Form inputs for the customer first and last name -->
        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="FIRST NAME*"
        />
        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="LAST NAME*"
        />

        <!-- Form inputs for the customer email address and contact number -->
        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="EMAIL ADDRESS*"
        />
        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="CONTACT NUMBER*"
        />

        <!-- Text Area allowing user to enter their billing and delivery address -->
        <textarea
          class="billing-address-input"
          rows="7"
          placeholder="ENTER YOUR DELIVERY AND BILLING ADDRESS (E.G., 171 MULBERRY DRIVE, FAIRVIEW GARDENS, BLOCK 12 UNIT 6, DURBAN, 5000)"
        ></textarea>
      </form>
    </div>

    <!-- Sub-section: Payment Information -->
    <div class="payment-info-container mt-4 mb-3">
      <h5>Payment Information:</h5>

      <p>
        Your payment information is securely encrypted and processed. Please
        provide your card details to complete your purchase.
      </p>

      <!-- Form inputs for the customer credit card name and number -->
      <form class="checkout-form my-3">
        <input
          type="text"
          class="checkout-form-input card-details d-inline-block"
          placeholder="NAME ON CARD*"
        />

        <input
         type="text"
          class="checkout-form-input card-details d-inline-block"
          placeholder="CARD NUMBER*"
        />

        <!-- Form inputs for the customer credit card expiry date and 3 digit CVV number -->
        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="EXP. DATE MM / YY*"
        />

        <input
          type="text"
          class="checkout-form-input d-inline-block"
          placeholder="CVV*"
        />
      </form>
    </div>

    <div class="payment-page-btn-container">
      <!-- Button to confirm purchase / order -->
      <button onclick="confirmOrder()" class="app-btn payment-page-btn">CONFIRM ORDER</button>

      <!-- Button / Link to continue shopping - re-routes customer to the "Shop" page -->
      <a
        id="checkout-continue-shopping-btn"
        class="app-btn payment-page-btn"
        href="products.html"
        >CONTINUE SHOPPING</a
      >

      <!-- Button to cancel purchase / order -->
      <a onclick="clearShoppingCart()" href="products.html" class="app-btn payment-page-btn">CANCEL ORDER</a>
    </div>
  </div>
  `;
}

/*
GENERATING THE CONFIRMED ORDER MESSAGE:
* This function displays a confirmation message to the user after successfully placing an order.
*/
function confirmOrder() {
  const orderConfirmationMessageContainer = document.getElementById(
    "order-confirmation-message-container"
  );

  //Adding CSS classes to display the order confirmation message.
  orderConfirmationMessageContainer.classList.add("info-message-container");
  orderConfirmationMessageContainer.classList.remove(
    "info-message-container-hidden"
  );

  //Generating a random number that serves as the "reference number" for the order.
  let refNumber = Math.floor(Math.random() * 10000 + 1);

  //HTML structure for the order confirmation message.
  orderConfirmationMessageContainer.innerHTML = `
    <div
      id="order-confirmation-message-content"
      class="info-message-content"
    >
      <h3 class="mb-3">Order Confirmed!</h3>
      <p>
        Thank you for choosing The Spice Pantry! Your order has been
        confirmed.
        <span id="order-ref-number" class="order-ref-number">ORDER REFERENCE NUMBER: *SPICE${refNumber}</span>
      </p>
      <p>
        If you have any questions regarding your order, please don't hesitate
        to contact us at
        <a href="mailto:customercare@thespicepantry.co.za"
          >customercare@thespicepantry.co.za</a
        >
      </p>
      <p>
        For details on our refund and exchange policy, please refer to our
        <a href="../html/refundPolicy.html">Refund & Exchange Policy</a>.
      </p>
      <p>We look forward to welcoming you back to The Spice Pantry soon!</p>
      <a class="app-btn info-message-close-btn" href="../html/landPage.html"
        >CLOSE</a
      >
      </div>
  `;

  //Clearing the shopping cart after the order is confirmed.
  clearShoppingCart();
}
