import {HttpClient} from "src/scripts/module/HttpClient";

const productEndpoint = restApi + "/products";


const data = await new HttpClient(productEndpoint).get();
createTable(data);

console.log("test virker dette")

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    buildPage();
  });
} else {
  buildProduct();
}


function buildProduct(product) {

  console.log(product.id)
  let productContainer = document.createElement("div");
  productContainer.classList.add("col");

  let productElement = document.createElement("div");
  productElement.id = product.id;
  productElement.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let cardHeader = document.createElement("h5");
  cardHeader.textContent = product.title; //title goes here;
  cardHeader.classList.add("product-title");
  cardBody.append(cardHeader)}
