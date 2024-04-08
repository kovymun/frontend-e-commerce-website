/** THE SPICE PANTRY - CART ITEM NUMBER DISPLAY JAVASCRIPT FILE **/

//Retrieving the basket / shopping cart data from local storage, if available.
let basket = JSON.parse(localStorage.getItem("products")) || [];

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

  //Updating the textContent of the "navbar shopping cart icon" with total number of items in the shopping cart.
  cartIcon.textContent = totalNoBasketItems;

  //Verify if the basket is not empty.
  if (basket.length > 0) {
    //Updating the textContent of the "responsive cart navigation link icon" with total number of items in the shopping cart.
    responsiveCartTotal.textContent = totalNoBasketItems;

    //Adding the respective classes for styling
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
    responsiveCartTotal.textContent = "";
  }
}

//Invoking the iconCalculation() function to update the navbar shopping cart icon and responsive cart navigation link icon count.
iconCalculation();
