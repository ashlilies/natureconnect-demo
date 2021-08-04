/* stuff to add to cart */

/* simple function to read item quantity from array by instances in array */
function get_item_quantity(item_name)
{
  var counter;

  counter = 0;
  for (var i = 0; i < shopping_cart.length; i++)
    if (shopping_cart[i] == item_name)
      counter += 1;

  return counter;
}

/* get item price USING NAME ONLY from childNodes... */
function get_item_price(item_name)
{
  let item_price, item_elems, item_elems_index, raw_item_price;

  item_elems = document.getElementsByClassName("item_name");
  for (i = 0; i < item_elems.length; i++)
    if (item_elems[i].innerText == item_name) {
      item_elems_index = i;
      break;
    }

  if (item_elems[item_elems_index].nextSibling.className == "item_price") {
    raw_item_price = item_elems[item_elems_index].nextSibling.innerText;
    raw_item_price = raw_item_price.replace("$", "");
    console.log("Index of product with name " + item_name + " is " + item_elems_index + " and raw price is " + raw_item_price);
    return Number(raw_item_price);
  }
  else
    console.log("HTML Format of shopping list is wrong! :\(");
}

function add_item(that)
{
  console.log(that);

  /* scoped variables used in this function */
  // let price_of_item, item_name;
  let item_name;

  // /* function to get raw item price as str */
  // function get_raw_item_price(item)
  // {
  //   /* get the price of the item with the $ symbol */
  //   price = item.childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText;
  //
  //   /* strip the $ symbol */
  //   price = price.substring(1);
  //
  //   return price;
  // }

  /* what we actually execute */
  item_name = that.childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerText;
  // price_of_item = Number(get_item_price(item_name));

  // console.log("item_name: " + item_name + "\n" + "price_of_item: " + price_of_item);

  shopping_cart.push(item_name);
  // shopping_cart_prices.push(price_of_item);
  //
  // console.log("array cart: " + shopping_cart + "\n" + "array prices: " + shopping_cart_prices);

  upd_price();
}

/* HTML5 local storage. Please call after any function that modifies cart. */
function locstor_save()
{
  /* JSON.stringify() */
  let s_shopping_cart = JSON.stringify(shopping_cart);
  localStorage.setItem("CartItems", s_shopping_cart);
  console.log("Saved shopping cart to local storage! Contents: " + shopping_cart);
}

/* Please call after page load */
function locstor_get()
{
  if ("CartItems" in localStorage) {
  let s_shopping_cart = localStorage.getItem("CartItems");
  /* JSON.parse() */
  shopping_cart = JSON.parse(s_shopping_cart);
  console.log("Read shopping cart from local storage! Contents: " + shopping_cart);
  } else
    console.log("Shopping cart not present in local storage (first time user!?), not reading...")
}

function upd_price()
{
  let item_price, total_price, total_price_elem;

  total_price = 0;
  total_price_elem = document.getElementById("shopping_cart_total");

  /* add up prices in cart */
  for (var i = 0; i < shopping_cart.length; i++) {
    item_price = get_item_price(shopping_cart[i]);
    total_price += item_price;
  }

  /* had to add Number() as if total_price is int, toFixed() not a function */
  total_price_elem.innerHTML = Number(total_price).toFixed(2);

  /* on the checkout page */
  cart_total_elem = document.getElementById("checkout_total");
  cart_total_elem.innerHTML = Number(total_price).toFixed(2);

  /* since this function is run whenever cart is updated, we save localstorage*/
  locstor_save();
}

/* make all item cells clickable */
function clickable_cells()
{
  let num_items = document.querySelectorAll('#product_listing .item_cell').length;

  for (var i = 0; i < num_items; i++)
    document.getElementsByClassName("item_cell")[i].setAttribute("onclick", "add_item(this);");

  console.log("Added clickable product cells!")
}

/* show the shopping cart items in the modal */
function show_cart()
{
  let new_elem, pay_now_btn, clear_cart_btn, modal_body, cart_table;

  pay_now_btn = document.getElementById("pay_now");
  clear_cart_btn = document.getElementById("clear_cart");
  modal_body = document.getElementById("cart_display");


  /* if cart empty, we show fancy text to say so and disable pay now button, else we initialize it to prevent adding same thing every single time, and enable pay now button */
  if (shopping_cart.length == 0) {
    modal_body.innerHTML = "<strong>No items in cart...</strong>";
    pay_now_btn.setAttribute("disabled", "true");
    clear_cart_btn.setAttribute("disabled", "true");
    clear_cart_btn.removeAttribute("onclick");
  } else {
    modal_body.innerHTML = "<table id=\"cart_table\" border=\"1\"><tr id=\"header_row\"><th id=\"itemFriendlyID\">ID</th><th id=\"itemNAME\">Product Name</th><th id=\"itemPRICE\">Price</th><th id=\"itemQUANTITY\">Quantity&nbsp;&nbsp;</th></tr></table>";
    cart_table = document.getElementById("cart_table").childNodes[0];
    clear_cart_btn.removeAttribute("disabled");
    clear_cart_btn.setAttribute("onclick", "clear_cart_confirm()\;");
    pay_now_btn.removeAttribute("disabled");
  }

  var already_displayed = [];
  var friendly_id = 0;
  /* never executes if nothing in shopping cart */
  for (var i = 0; i < shopping_cart.length; i++) {
  // for (var i in shopping_cart) {
    /* create new elem */
      // new_elem = document.createElement("li");
      // new_elem.classList.add("list-group-item");
      //
      // new_elem.innerHTML = shopping_cart[i] + " <b>($" + get_item_price(shopping_cart[i]).toFixed(2) + ")</b>";
      // /* then append it */
      // modal_body.appendChild(new_elem);

      if (already_displayed.includes(shopping_cart[i]))
        continue;

      friendly_id += 1;

      /* create new elem in a table row, and then append it */
      new_elem = document.createElement("tr");

      new_elem.innerHTML = "<tr><td id=\"itemFriendlyID\">"+ friendly_id + "</td><td id=\"itemNAME\">" + shopping_cart[i] + "</td><td id=\"itemPRICE\">" + get_item_price(shopping_cart[i]).toFixed(2) + "</td><td id=\"itemQUANTITY\">" + get_item_quantity(shopping_cart[i]) + "</td></tr>";

      cart_table.appendChild(new_elem);

      console.log("Pushing " + shopping_cart[i] + " to already_displayed, hence contents: " + already_displayed);
      already_displayed.push(shopping_cart[i]);
  }


}

/* when user clicks on btn-danger Clear Cart we onclick this function... */
function clear_cart_confirm()
{
  confirmation = confirm("Are you sure you wish to clear the Cart?");

  if (confirmation) {
    shopping_cart = [];
    $("#exampleModal").modal("hide");
    upd_price();
  }
}

/* equivalent of our main() function in JS, but executed only on page load to
 * prevent issues */
document.addEventListener("DOMContentLoaded", function() {
    /* add your functions to run here */
    clickable_cells();
    locstor_get();

    /* set up total price to 0 */
    upd_price();

}
);

/* global variable init a la main() - shopping cart array and price array, ran when js loaded */
var shopping_cart = [];
