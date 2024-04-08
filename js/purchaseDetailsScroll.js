/** THE SPICE PANTRY - CART ITEM PURCHASE SUMMARY TABLE SCROLL FUNCTIONALITY JAVASCRIPT FILE**/
/*
 * This script activates scroll functionality on the "cart item purchase summary table" that is displayed on the "shopping cart".
 * It is a feature that is triggered when the number of table rows of the "cart item purchase summary table" exceeds 4.
 * It is designed as an aesthetic addition to the "cart item purchase summary table" - to improve the overall user interface and experience.
 */

function tableScroll() {
  //Retrieving all elements related to "cart item purchase summary table".
  const tableBody = document.getElementById("table-responsive");
  const purchaseSummaryRow = document.getElementsByClassName(
    "cart-purchase-summary-row"
  );

  //Count the total number of rows.
  const rowCount = purchaseSummaryRow.length;
  const maxRows = 4;

  //Check if the table body element exists, apply the following conditional statements to add / remove the "scrollable" class.
  if (tableBody) {
    if (rowCount > maxRows) {
      tableBody.classList.add("scrollable");
    } else {
      tableBody.classList.remove("scrollable");
    }
  }
}

//Invoking the tableScroll() function
tableScroll();
