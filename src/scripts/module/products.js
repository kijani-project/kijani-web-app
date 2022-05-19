import {HttpClient} from "src/scripts/module/HttpClient";

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

  let productsPerRow = 4;
  let maxLength = 100;

  for (let productId = 0; productId < productsPerRow; productId++) {

    if (products[productId] !== undefined) {
      let description = textEllipsis(products[productId].description, maxLength);
      cardDiv.innerHTML += `
    <div class="col-${12 / productsPerRow} pb-xl-5">
      <div class="card mx-auto">
        <img src="${products[productId].imageLink}" class="card-img-top" alt="" loading="lazy">
          <div class="card-body">
            <p class="card-text"><strong>${products[productId].name}</strong></p>
            <p class="card-text">${description}</p>
          </div>
      </div>
    </div>`;
    }
  }
}

window.addEventListener("load", async () => {
  await createCategoryBlocks();
});

function textEllipsis(str, maxLength, {side = "end", ellipsis = "..."} = {}) {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }

  return str;
}
