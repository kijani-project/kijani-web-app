import {HttpClient} from "src/scripts/module/HttpClient";

const productEndpoint = restApi + "/products";
const categoryEndpoint = restApi + "/categories";

const cardDiv = document.getElementById("product-row");
const filterDiv = document.getElementById("index-filter-dropdown");

function getProducts(category) {
  //return new HttpClient(productEndpoint + "?categoryId=" + category.categoryId).get(); // TODO use this
  return new HttpClient(productEndpoint).get();
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
  cardDiv.innerHTML += `<h3 class="text-center mb-xl-3">${category.categoryName}</h3>`;
}

function createBanner(category) {
  cardDiv.innerHTML += `<div class="mb-xl-3">
    <img alt="${category.categoryName}" loading="lazy"
         class="rounded mb-5" src="${category.imageLink}" style="width: 100%">
  </div>`;
}

async function createRowOfCards(products) {

  let productsPerRow = 4;
  let maxLength = 100;

  for (let productId = 0; productId < productsPerRow; productId++) {

    let description = textEllipsis(products[productId].description, maxLength);

    cardDiv.innerHTML += `
    <div class="col-${12 / productsPerRow} mb-xl-5">
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

async function filterNavMenu() {
  let filters = 4;

  for (let productId = 0; productId < filters; productId++) {
    await createFilterDropdown();
  }
}

async function createFilterDropdown() {
  const categories = await new HttpClient(categoryEndpoint).get();

  let div = document.createElement("div");
  div.classList.add(`col-${12 / 4}`)

  let select = document.createElement("select");
  select.classList.add("form-select");

  Object.values(categories).forEach(category => {
    let opt = document.createElement('option');
    opt.value = category.categoryId;
    opt.text = category.categoryName;
    select.append(opt);

    div.append(select)
  })

  filterDiv.append(div);
}



window.addEventListener("load", async () => {
  await filterNavMenu();
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






