/** THE SPICE PANTY - SHOP / PRODUCTS PAGE JAVASCRIPT INDEX FILE **/
/* This JS file renders elements and components of the shop / products page. */

//Basket array with product data stored in localStorage.
let basket = JSON.parse(localStorage.getItem("products")) || [];

//Retrieving the element to display all product items.
let shop = document.getElementById("shop");

/*
Function to generate each product item to be displayed on the products page.
shopItem array referenced from the prodInventory.js file.
*/
function generateShop() {
  //HTML structure for each shop product item.
  return (shop.innerHTML = shopItems
    .map(function (product) {
      //Destructuring the shop products object.
      let { id, name, price, desc, img, alt } = product;
      let searchProduct =
        basket.find((productItem) => productItem.id === id) || [];

      return `
      <div id="product-${id}" class="app-content-container row mb-4 g-0 align-items-md-stretch">
        <div class="col-xxl-6 col-lg-4 col-md-6 align-items-md-stretch">
          <img
            class="img-fluid object-fit-cover w-100 h-100"
            src=${img}
            alt=${alt}
          />
        </div>
        <div
            class="col-xxl-6 col-lg-8 col-md-6 p-4 d-flex p-4 d-flex flex-column justify-content-center"
          >
          <h4>${name}</h4>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>Price: ${price} ZAR <span class="product-sale-weight">per 50g</span></h2>
            <div id="cart-quantity" class="cart-quantity app-btn">
              <h4 class="cart-qty-heading">QTY</h4>
              <div class="quantity-buttons">
                <i onclick="decrementQty(${id})" id="minus" class="bi bi-dash-lg d-inline-block"></i>
                  <div id="${id}" class="quantity">${searchProduct.numberOfItems === undefined ? 0 : searchProduct.numberOfItems}</div>
                <i onclick="incrementQty(${id})" id="plus" class="bi bi-plus-lg d-inline-block"></i>
              </div>
            </div>
            <a id="shop-cart-btn" class="app-btn shop-cart-btn text-center" href="../html/cart.html">GO TO CART</a>
          </div>
        </div>  
      </div>
   `;
    })
    .join(""));
}

//Invoking the generateShop() function
generateShop();

/* INCREMENT, DECREMENT AND UPDATE BUTTON FUNCTIONS */
/*
 * Function to add product items to the shopping cart from the "Shop" page.
 * Increments the quantity of the selected product in the basket, or adds it if not present.
 */
function incrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  //Adding the item to the basket if not present.
  if (searchProduct === undefined) {
    basket.push({
      id: selectedProduct.id,
      numberOfItems: 1,
    });
  }
  //Incrementing QTY by 1.
  else {
    searchProduct.numberOfItems += 1;
  }
  //Updating the quantity display and saving the basket items to localStorage.
  qtyUpdate(selectedProduct.id);
  localStorage.setItem("products", JSON.stringify(basket));
}

/*
 * Function to remove product items from the shopping cart from the "Shop" page.
 * Decrements the quantity of the selected product in the basket, or removes it if present.
 */
function decrementQty(id) {
  let selectedProduct = id;
  let searchProduct = basket.find(
    (productItem) => productItem.id === selectedProduct.id
  );
  if (searchProduct === undefined) {
    return;
  } else if (searchProduct.numberOfItems === 0) {
    return;
  }
  //Decrementing QTY by 1.
  else {
    searchProduct.numberOfItems -= 1;
  }
  qtyUpdate(selectedProduct.id);
  basket = basket.filter((productItem) => productItem.numberOfItems !== 0);
  localStorage.setItem("products", JSON.stringify(basket));
}

/* Function to update and display the number of items per product item added to the shopping cart. */
function qtyUpdate(id) {
  let searchProduct = basket.find((productItem) => productItem.id === id);
  document.getElementById(id).innerHTML = searchProduct.numberOfItems;
  //Updating the cart icon (count).
  iconCalculation();
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
