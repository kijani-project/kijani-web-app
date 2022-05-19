import {HttpClient} from "src/scripts/module/HttpClient";
import {ProductCard} from "src/scripts/module/ProductCard";

const productEndpoint = restApi + "/products";
const categoryEndpoint = restApi + "/categories";

const cardDiv = document.getElementById("product-row");

function getProducts(category) {
  return new HttpClient(productEndpoint + "?categoryId=" + category.categoryId).get();
}

async function createCategoryBlocks() {

  const categories = await new HttpClient(categoryEndpoint).get();

  for (let category of Object.values(categories)) {
    createBanner(category);
    createHeader(category);
    await createRowOfCards(await getProducts(category));
  }
}

function createHeader(category) {
  cardDiv.innerHTML += `<h3 class="text-center pb-xl-4">${category.categoryName}</h3>`;
}

function createBanner(category) {
  cardDiv.innerHTML += `<div class="pb-xl-3">
    <img alt="${category.categoryName}" loading="lazy"
         class="banner-img pb-5" src="${category.imageLink}" style="width: 100%">
  </div>`;
}

async function createRowOfCards(products) {
  for (let productId = 0; productId < productsPerRow; productId++) {
    cardDiv.innerHTML += new ProductCard(products[productId]).create();
  }
}

window.addEventListener("load", async () => {
  await createCategoryBlocks();
});
