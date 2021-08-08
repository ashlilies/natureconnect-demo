/* COPYRIGHT (c) 2021 Ashlee Tan. All rights reserved. */
/* Main.js meant for all web pages. Contains only generic stuff such as navbar,
 * motd & generic page background.
 */

function getCookie(cname) {
 let name = cname + "=";
 let decodedCookie = decodeURIComponent(document.cookie);
 let ca = decodedCookie.split(';');
 for (let i = 0; i <ca.length; i++) {
   let c = ca[i];
   while (c.charAt(0) == ' ')
     c = c.substring(1);
   if (c.indexOf(name) == 0)
     return c.substring(name.length, c.length);
 }
 return "";
}

/* check, HIDES the MOTD if it was previously closed, otherwise prints the Motd */
function motdChecker()
{
  let motdStatusCookie = getCookie("motdStatus");

  motdStatusCookie == "closed" ? closeMotd("hide") : loadMotd();
}

/* CLOSES the MOTD fancily, unless "hide" is passed to function */
function closeMotd(hideStatus)
{
  motd = document.getElementById('motd');
  motd.style.opacity = 1;

  function fade()
  {
    /* ternary operator: condition ? ifTrueExecuteThis : butIfFalseExecuteThis */
    (motd.style.opacity -= .1) < 0 ? motd.style.display = "none" : setTimeout(fade,40)
    // if ((motd.style.opacity -= 0.1) < 0)
    //   motd.style.display = "none";
    // else
    //   setTimeout(fade, 40);

    /* after fading out, we then finally write a cookie to remember that it's
     * closed  - until the browser is restarted.
     */
    document.cookie = "motdStatus=closed;SameSite=Strict";
  }

  hideStatus == "hide" ? motd.style.display = "none" : fade();
}

function highlightNav(elem)
{
  elem.parentElement.style.backgroundColor = "#35bd78bb";
  elem.parentElement.style.borderRadius = "0.25rem";
}

/* useful for a lot of other functions here */
function get_current_page_filename()
{
  let path = window.location.pathname;
  let page = path.split("/").pop();
  return page;
}

/* load the current motd for all pages in a function */
function loadMotd()
{
  let motdBanner = document.getElementById("motd");
  motdBanner.querySelector("#" + "visible").innerHTML = "NOTICE: New souvenirs now available in the <a href=\"shop.html\">Shop</a>! Buy today!";
}

/* our main() function, but in js, once the page is loaded execute what? */
document.addEventListener("DOMContentLoaded", function() {
    motdChecker();
}
);

/* get url parameters */
function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}
