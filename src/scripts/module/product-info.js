import {HttpClient} from "src/scripts/module/HttpClient";
import {ProductCard} from "src/scripts/module/ProductCard";

const productEndpoint = restApi + "/products";
const categoryEndpoint = restApi + "/categories";
const productEcoLabelEndpoint = restApi + "/productEcoLabels";
const designerEndpoint = restApi + "/designer"

const cardDiv = document.getElementById("product-row");
const headerOne = document.getElementById("product-title1");

async function createPageContent() {
  const url = new URL(window.location.href);
  const categoryParam = url.searchParams.get("categoryId");
  const productEcoLabelParam = url.searchParams.get("productEcoLabelId");
  const designerParam = url.searchParams.get("designerId");

  if (categoryParam) {
    await showProductsByCategory(categoryParam);
  } else if (productEcoLabelParam) {
    await showProductsByProductEcoLabel(productEcoLabelParam);
  } else if (designerParam) {
    await showProductsByDesigner(designerParam);
  } else {
    await showProducts1();
  }
}


let data = productEndpoint +"/"+6;
let data1 = data.name;
console.log(data1);
async function showProducts1() {
  await updateHeaderOne1(data1);
  await createProductCards(productEndpoint);
}


//-------------------------NOT Relevant for us------------------------------//

async function showProductsByDesigner(designerParam) {
  const designer = await new HttpClient(designerEndpoint + "/" + designerParam).get()
    .catch(elementNotFound);
  updateHeaderOne1(designer.name);
  await createProductCards(productEndpoint + "?designerId=" + designer.name);
}

async function showProductsByProductEcoLabel(productEcoLabelParam) {
  const productEcoLabel = await new HttpClient(productEcoLabelEndpoint + "/" + productEcoLabelParam).get()
    .catch(elementNotFound);
  updateHeaderOne1(productEcoLabel.type);
  await createProductCards(productEndpoint + "?productEcoLabelId=" + productEcoLabel.productEcoLabelId);
}

async function showProductsByCategory(categoryParam) {
  const category = await new HttpClient(categoryEndpoint + "/" + categoryParam).get()
    .catch(elementNotFound);
  const subCategories = category.subCategories;
  updateHeaderOne1(category.categoryName);
  updateSubCategories(subCategories);
  await createProductCards(productEndpoint + "?categoryId=" + category.categoryId);
}

function updateSubCategories(subCategories) {
  let subCategoryList = [];

  Object.values(subCategories).forEach(subCategory => {
    subCategoryList.push(subCategory.subCategoryName);
  })

  let subCategoriesSeparated = subCategoryList.join(", ");

  cardDiv.innerHTML = `<div class="text-center mb-5"><p>${subCategoriesSeparated}</p></div>`;
}



//-------------------------Relevant for us------------------------------//


function updateHeaderOne1(title) {
  headerOne.innerText = title;
}

async function createProductCards(endpoint) {

  const products = await new HttpClient(endpoint).get();

  if (products.length) {
    Object.values(products).forEach(product => {
      createCard(product);
    })
  } else {
    productsNotFound();
  }
}

function createCard(product) {
  cardDiv.innerHTML += new ProductCard(product).create();
}


//-------------------------Not relevant for us------------------------------//


function productsNotFound() {
  cardDiv.innerHTML = "Der blev ikke fundet nogen produkter.";
}

function elementNotFound() {
  cardDiv.innerHTML = "Der blev ikke fundet noget for det valgte søgekriterie.";
}

window.addEventListener("load", async () => {
  await createPageContent();
});
