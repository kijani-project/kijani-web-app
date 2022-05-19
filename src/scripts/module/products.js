import {HttpClient} from "src/scripts/module/HttpClient";

const productEndpoint = restApi + "/products";
const categoryEndpoint = restApi + "/categories";
const cardDiv = document.getElementById("product-row");
const headerOne = document.getElementById("product-title");

async function createPageContent() {
  const url = new URL(window.location.href);
  const categoryId = url.searchParams.get("categoryId");

  const category = await new HttpClient(categoryEndpoint + "/" + categoryId).get()
    .catch(noCategory);

  if (category !== undefined) {
    updateHeaderOne(category);
    await createCards(category)
  }
}

function updateHeaderOne(category) {
  headerOne.innerText = category.categoryName;
}

async function createCards(category) {
  let endpoint;

  if (category.categoryId != null) {
    endpoint = productEndpoint + "?categoryId=" + category.categoryId;
  } else {
    endpoint = productEndpoint;
  }

  const products = await new HttpClient(endpoint).get();

  if (products.length) {
    Object.values(products).forEach(product => {
      createCard(product);
    })
  } else {
    noProducts();
  }
}

function createCard(product) {
  let productsPerRow = 4;

  cardDiv.innerHTML += `
    <div class="col-${12 / productsPerRow} pb-xl-5">
      <div class="card mx-auto">
        <img src="${product.imageLink}" class="card-img-top" alt="" loading="lazy">
          <div class="card-body">
            <p class="card-text"><strong>${product.name}</strong></p>
          </div>
      </div>
    </div>`;
}

function noProducts() {
  cardDiv.innerHTML = "Der er ingen produkter i denne kategori.";
}

function noCategory() {
  cardDiv.innerHTML = "Denne kategori findes ikke.";
}

window.addEventListener("load", async () => {
  await createPageContent();
});
