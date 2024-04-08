/** THE SPICE PANTRY - NAVBAR WINDOW SCROLL JAVASCRIPT FILE **/
/*
 * This feature is designed as an aesthetic addition to the responsive navigation bar - to improve the overall user interface.
 * It enables a visually appealing glassmorphic effect on the responsive navigation bar.
 * The effect triggers on screen widths of 768px and below (<=768px) when the user scrolls up or down.
 */

//Retrieving elements with the class "app-page".
const appPage = document.querySelector(".app-page");
let appPageWidth = appPage.offsetWidth;

//Create a ResizeObserver instance - measures the changes in target page width.
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    if (entry.target === appPage) {
      //Updating the appPageWidth variable with the new measured width.
      appPageWidth = entry.contentRect.width;

      //Check if the page width is <= 768px and execute code / script accordingly.
      if (appPageWidth <= 768) {
        //If the width is <= 768px, add a scroll event listener to the appPage
        appPage.addEventListener("scroll", () => {
          const siteHeader = document.getElementById("site-header");

          //Vertical scroll position of appPage
          const verticalScrollPx = appPage.scrollTop;

          //Add or remove the "site-header-scroll-background" class based on condition below.
          if (verticalScrollPx > 0) {
            siteHeader.classList.add("site-header-scroll-background");
          } else {
            siteHeader.classList.remove("site-header-scroll-background");
          }
        });
      }
    }
  }
});

// Start observing the target element for size changes
resizeObserver.observe(appPage);
