const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title.slice( 0 , 25)}</h3>
      <p>Category: ${product.category}</p>
      <p>Global Ratings: <i class="fa fa-star"></i>
    ${product.rating.rate} (${product.rating.count}) </p>      
      <h2>Price:<span class="price"> $ ${product.price}</span></h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="cst-btn-cart">add to cart</button>
      <button id="details-btn" class="cst-btn">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);

                          // 24)  ${cartRating(product.rating.rate)} <div id="rating-div">5545212</div>
  }
};

// const cartRating = (rating) =>{
//   // console.log( rating)
//     // const parseRating = parseInt(rating);
//     // console.log(parseRating)
//     const para = document.getElementById("rating-div");
//       console.log(para)
//       // para.innerHTML = `<i class="fa fa-star"></i>`;


//       //  const li = document.createElement('li');
//       // const i =  `<i class="fa fa-star"></i>`;
//       //  p.appendChild(i)
//     //  return p;
// }

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2) ;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
