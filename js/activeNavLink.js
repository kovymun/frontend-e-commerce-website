/** THE SPICE PANTRY - ACTIVE NAV-LINK INDICATOR JAVASCRIPT FILE **/
/*
Active NavLink indicator:
* This script is for styling the active navigation links in the application.
* As a means of improving the overall user experience, this feature / aesthetic is used to visually indicate to the user the page they are currently viewing.
* The active navigation link styling is applied to devices with a screen width of 768 pixels and above (> 768px).
*/

//Retrieving all navigation link elements within the navigation bar list.
const navLinkElements = document.querySelectorAll("nav ul li a");

//Determine the current page by checking if it has the "landing-page" class or the "app-page" class.
let page;
if (document.querySelector(".landing-page")) {
  page = document.querySelector(".landing-page");
} else {
  page = document.querySelector(".app-page");
}

//Page error handling.
if (!page) {
  console.log("Page not found!");
} else {
  //Page width measurement (pixels).
  let pageWidth = page.offsetWidth;

  //Create a ResizeObserver instance - measures the changes in target page width.
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === page) {
        //Updating the pageWidth variable with the new measured width.
        pageWidth = entry.contentRect.width;

        //Check if the page width is greater than 768px and execute code / script accordingly.
        if (pageWidth > 768) {
          //Current active page URL
          const currentActivePage = window.location.pathname;

          //Loop over each navigation bar link.
          navLinkElements.forEach((link) => {
            //Add or remove the "nav-link-active" class based on condition below.
            if (link.href.includes(currentActivePage)) {
              link.classList.add("nav-link-active");
            } else {
              link.classList.remove("nav-link-active");
            }
          });
        } else {
          //Remove the class if width is less than or equal to 768px
          navLinkElements.forEach((link) => {
            link.classList.remove("nav-link-active");
          });
        }
      }
    }
  });

  //Start observing the target element for size changes
  resizeObserver.observe(page);
}
