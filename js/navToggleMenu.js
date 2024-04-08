/** THE SPICE PANTRY - RESPONSIVE NAVBAR TOGGLE MENU FUNCTIONALITY JAVASCRIPT FILE **/
/*
* This feature enables functionality for toggling the visibility of the navigation bar for devices with a smaller screen width, 
  when the hamburger menu icon is clicked.
*/

//Retrieving the landing page, navbar container and footer elements.
const landingPage = document.querySelector(".landing-page");
const navContainer = document.querySelector(".navbar-container");
const footer = document.querySelector(".footer");

//Function to toggle the visibility of the responsive navbar menu.
const navToggleMenu = () => {
  //Toggling the "visible" class on the navbar container to show / hide the menu.
  navContainer.classList.toggle("visible");

  //Checking if a footer element exists, and toggle the "hidden" class on the footer to show / hide it.
  if (footer) {
    footer.classList.toggle("hidden");
  }

  // Get the site header element
  const siteHeader = document.getElementById("site-header");

  //Checking if the the navigated page is not the landing page. If not, apply the scroll background effect.
  if (!landingPage) {
    // If navbar menu is open, remove the background effect
    if (navContainer.classList.contains("visible")) {
      siteHeader.classList.remove("site-header-scroll-background");
    } else {
      // If navbar menu is closed, add the background effect
      siteHeader.classList.add("site-header-scroll-background");
    }
  }
};
