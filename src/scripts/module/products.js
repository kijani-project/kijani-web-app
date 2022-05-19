import {HttpClient} from "src/scripts/module/HttpClient";
import {ProductCard} from "src/scripts/module/ProductCard";

const productEndpoint = restApi + "/products";
const categoryEndpoint = restApi + "/categories";
const productEcoLabelEndpoint = restApi + "/productEcoLabels";
const subCategoryEndpoint = restApi + "/subCategories"

const cardDiv = document.getElementById("product-row");
const headerOne = document.getElementById("product-title");

async function createPageContent() {
  const url = new URL(window.location.href);
  const categoryId = url.searchParams.get("categoryId");
  const productEcoLabelId = url.searchParams.get("productEcoLabelId");

  const category = await new HttpClient(categoryEndpoint + "/" + categoryId).get()
    .catch(noCategory);

  const productEcoLabel = await new HttpClient(productEcoLabelEndpoint + "/" + productEcoLabelId).get()
    .catch(noCategory);

  const subCategories = await new HttpClient(subCategoryEndpoint).get();

  if (category) {
    updateHeaderOne(category);
    updateSubCategories(subCategories);
    await createCards(category);
  } else if (productEcoLabel) {
    updateHeaderOne(category);
    await createProductEcoLabelCards(productEcoLabel);
  }
}

function updateSubCategories(subCategories) {
  let subCategoryList = [];

  Object.values(subCategories).forEach(subCategory => {
    subCategoryList.push(subCategory.subCategoryName);
  })

  let subCategoriesSeparated = subCategoryList.join(", ");

  cardDiv.innerHTML = `<div class="text-center mb-5"><p>${subCategoriesSeparated}</p></div>`;
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

async function createProductEcoLabelCards(productEcoLabel) {
  let endpoint;

  if (productEcoLabel.productEcoLabelId != null) {
    endpoint = productEndpoint + "?productEcoLabelId=" + productEcoLabel.productEcoLabelId;
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
  cardDiv.innerHTML += new ProductCard(product).create();

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
