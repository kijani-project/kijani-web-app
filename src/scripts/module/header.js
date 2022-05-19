import {HttpClient} from "src/scripts/module/HttpClient";

async function updateDropdownMenuCategories() {
  const categoryEndpoint = restApi + "/categories";
  const categories = await new HttpClient(categoryEndpoint).get();

  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuCategories"]');
  const paramName = "categoryId";
  const productHtmlPage = "product.html";

  Object.values(categories).forEach(category => {
    let url = new URL(window.location.origin + "/" + productHtmlPage);
    url.searchParams.append(paramName, category.categoryId);

    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${category.categoryName}</a></li>`;
  })
}

async function updateDropdownMenuProductEcoLabels() {
  const productEcoLabelsEndpoint = restApi + "/productEcoLabels";
  const categories = await new HttpClient(productEcoLabelsEndpoint).get();

  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuProductEcoLabels"]');
  const pageName = "miljomarke";
  const productHtmlPage = "produkter.html";

  Object.values(categories).forEach(el => {
    let url = new URL(window.location.origin + "/" + productHtmlPage);
    url.searchParams.append(pageName, el.productEcoLabelId);
    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${el.type}</a></li>`;
  })
}

window.addEventListener("load", async () => {
  await updateDropdownMenuCategories();
  await updateDropdownMenuProductEcoLabels();
});
