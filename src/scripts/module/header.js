import {HttpClient} from "src/scripts/module/HttpClient";


async function updateDropdownMenuCategories() {
  const categoryEndpoint = restApi + "/categories";
  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuCategories"]');
  const pageName = "kategori";
  const productHtmlPage = "produkter.html";
  const categories = await new HttpClient(categoryEndpoint).get();

  Object.values(categories).forEach(el => {
    let url = new URL(domain + "/" + productHtmlPage);
    url.searchParams.append(pageName, el.categoryId)
    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${el.categoryName}</a></li>`;
  })
}

async function updateDropdownMenuProductEcoLabels() {
  const productEcoLabelsEndpoint = restApi + "/productEcoLabels";
  const categoryUl = document.querySelector('[aria-labelledby="navbarDropdownMenuProductEcoLabels"]');
  const pageName = "miljomarke";
  const productHtmlPage = "produkter.html";
  const categories = await new HttpClient(productEcoLabelsEndpoint).get();

  Object.values(categories).forEach(el => {
    let url = new URL(domain + "/" + productHtmlPage);
    url.searchParams.append(pageName, el.productEcoLabelId)
    categoryUl.innerHTML += `<li><a class="dropdown-item" href="${url}">${el.productEcoLabelName}</a></li>`;
  })
}

window.addEventListener("load", async () => {
  await updateDropdownMenuCategories();
  await updateDropdownMenuProductEcoLabels();
});
