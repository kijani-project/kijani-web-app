import {HttpClient} from "src/scripts/module/HttpClient";

const url = new URL(window.location.href);
const productParam = url.searchParams.get("productId");
const productEndpoint = restApi + "/products";


async function getProduct() {
  const product = await new HttpClient(productEndpoint + "/" + productParam).get();

  let name = product.name;
  let desc = product.description;
  let designers = [];
  Object.values(product.designers).forEach(designer => {
    designers.push(designer.name)
  });

  let width = product.measurement.width;
  let length = product.measurement.length;
  let height = product.measurement.height;
  let productImage = document.getElementById("product-image");
  let productEcolabel = document.getElementById("product-ecolabel");

  document.getElementById("product-name").innerText = name;
  document.getElementById("product-header").innerText = name;
  document.getElementById("product-desc").innerText = desc;
  document.getElementById("product-designers").innerText = designers.join(", ");
  document.getElementById("product-measurement-w").innerText = width +" cm";
  document.getElementById("product-measurement-l").innerText = length + " cm";
  document.getElementById("product-measurement-h").innerText = height + " cm";

  productImage.setAttribute("src", product.imageLink);

  for (let i = 0; i <3; i++) {
    productEcolabel.innerHTML += `<span data-bs-toggle="tooltip" title="${product.productEcoLabels[i].type}"><img class="bg-image hover-zoom" src="${product.productEcoLabels[i].imageLink}" alt="" id="ecoId"></span>`;
  }
}


window.addEventListener("load", async () => {
  await getProduct();
});
