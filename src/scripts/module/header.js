import {HttpClient} from "src/scripts/module/HttpClient";

const productHtmlPage = "produkter.html";

const designersEndpoint = restApi + "/designers";
const productEcoLabelsEndpoint = restApi + "/productEcoLabels";

async function updateDropdownMenuCategories() {
  const categoryEndpoint = restApi + "/categories";
  const categories = await new HttpClient(categoryEndpoint).get();

  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuCategories"]');
  const paramName = "categoryId";

  Object.values(categories).forEach(category => {
    let url = new URL(window.location.origin + "/" + productHtmlPage);
    url.searchParams.append(paramName, category.categoryId);

    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${category.name}</a></li>`;
  })
}

async function updateDropdownMenuProductEcoLabels() {

  const productEcoLabels = await new HttpClient(productEcoLabelsEndpoint).get();

  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuProductEcoLabels"]');
  const pageName = "productEcoLabelId";

  Object.values(productEcoLabels).forEach(productEcoLabel => {
    let url = new URL(window.location.origin + "/" + productHtmlPage);
    url.searchParams.append(pageName, productEcoLabel.productEcoLabelId);
    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${productEcoLabel.type}</a></li>`;
  })
}

async function updateDropdownMenuProductDesigners() {

  const designers = await new HttpClient(designersEndpoint).get();

  const designerUl = document.querySelector('[aria-labelledby="navbarDropdownMenuProductDesigners"]');
  const pageName = "designerId";

  Object.values(designers).forEach(designer => {
    let url = new URL(window.location.origin + "/" + productHtmlPage);
    url.searchParams.append(pageName, designer.designerId);
    designerUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${designer.name}</a></li>`;
  })
}

window.addEventListener("load", async () => {
  await updateDropdownMenuCategories();
  await updateDropdownMenuProductEcoLabels();
  await updateDropdownMenuProductDesigners();
});
