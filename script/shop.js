/* stuff to add to cart */

function add_item(that)
{
  console.log(that);

  /* scoped variables used in this function */
  let price_of_item, item_name;

  /* function to get raw item price as str */
  function get_raw_item_price(item)
  {
    /* get the price of the item with the $ symbol */
    price = item.childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText;

    /* strip the $ symbol */
    price = price.substring(1);

    return price;
  }

  /* what we actually execute */
  item_name = that.childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerText;
  price_of_item = Number(get_raw_item_price(that));

  console.log("item_name: " + item_name + "\n" + "price_of_item: " + price_of_item);

  shopping_cart.push(item_name);
  shopping_cart_prices.push(price_of_item);

  console.log("array cart: " + shopping_cart + "\n" + "array prices: " + shopping_cart_prices);

  upd_price();
}

function upd_price()
{
  let total_price = 0;

  total_price_elem = document.getElementById("shopping_cart_total");

  /* add up prices in cart */
  for (var i = 0; i < shopping_cart_prices.length; i++)
    total_price += shopping_cart_prices[i];

  total_price_elem.innerHTML = total_price.toFixed(2);

  /* on the checkout page */
  cart_total_elem = document.getElementById("checkout_total");
  cart_total_elem.innerHTML = total_price.toFixed(2);
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
  modal_body = document.getElementById("cart_display");


  /* if cart empty, we show fancy text to say so, else we initialize it to prevent adding same thing every single time */
  shopping_cart.length == 0 ? modal_body.innerHTML = "<strong>No elements in cart...</strong>" : modal_body.innerHTML = "";

  for (i = 0; i < shopping_cart.length; i++) {
    /* create new elem */
      let new_elem = document.createElement("li");
      new_elem.classList.add("list-group-item");

      new_elem.innerHTML = shopping_cart[i];
    /* then append it */
    modal_body.appendChild(new_elem);
  }

}

/* equivalent of our main() function in JS, but executed only on page load to
 * prevent issues */
document.addEventListener("DOMContentLoaded", function() {
    /* add your functions to run here */
    clickable_cells();

    /* set up total price to 0 */
    upd_price();

}
);

/* global variable  - shopping cart array and price array */
var shopping_cart = [];
var shopping_cart_prices = [];
