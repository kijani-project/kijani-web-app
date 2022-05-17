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
  cardDiv.innerHTML += `<h3 class="text-center mt-xl-5">${category.categoryName}</h3>`;
}

function createBanner(category) {
  cardDiv.innerHTML += `<div>
    <img alt="${category.categoryName}" loading="lazy"
         class="rounded mb-5" src="${category.imageLink}">
  </div>`;
}

async function createRowOfCards(products) {

  let productsPerRow = 4;
  let maxLength = 100;

  for (let productId = 0; productId < productsPerRow; productId++) {

    let description = textEllipsis(products[productId].description, maxLength);

    cardDiv.innerHTML += `
    <div class="col-${12 / productsPerRow}">
      <div class="card">
        <img src="${products[productId].imageLink}" class="card-img-top" alt="" loading="lazy">
          <div class="card-body">
            <p class="card-text">${products[productId].name}</p>
            <p class="card-text">${description}</p>
          </div>
      </div>
    </div>`;
  }
}

async function filterNavMenu() {

  let filters = 2;

  for (let productId = 0; productId < filters; productId++) {
    await createFilterDropdown();
  }
}

async function createFilterDropdown() {

  const categories = await new HttpClient(categoryEndpoint).get();

  let select = document.createElement("select");
  select.id = "supplier-category";
  select.className = "form-select";
  select.className = `col-${12 / 2}`;

  Object.values(categories).forEach(category => {
    let opt = document.createElement('option');
    opt.value = category.categoryId;
    opt.text = category.categoryName;
    select.append(opt);
  })

  filterDiv.append(select);
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






