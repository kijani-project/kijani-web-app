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
  cardDiv.innerHTML += `<h3 class="text-center pb-xl-4">${category.name}</h3>`;
}

function createBanner(category) {
  cardDiv.innerHTML += `<div class="pb-xl-3">
    <img alt="${category.name}" loading="lazy"
         class="banner-img pb-5 w-100" src="${category.imageLink}">
  </div>`;
}

async function createRowOfCards(products) {
  const shuffledProducts = Object.values(products).sort(() => 0.5 - Math.random());

  for (let i = 0; i < productsPerRow; i++) {
    if (shuffledProducts[i] !== undefined) {
      cardDiv.innerHTML += new ProductCard(shuffledProducts[i]).create();
    }
  }
}

window.addEventListener("load", async () => {
  await createCategoryBlocks();
});
