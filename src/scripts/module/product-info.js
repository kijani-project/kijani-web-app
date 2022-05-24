import {HttpClient} from "src/scripts/module/HttpClient";

const url = new URL(window.location.href);
const productParam = url.searchParams.get("productId");
const productEndpoint = restApi + "/products";

async function getProduct() {
  const product = await new HttpClient(productEndpoint + "/" + productParam).get();

  let designers = [];
  Object.values(product.designers).forEach(designer => {
    designers.push(designer.name)
  });

  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-header").innerText = product.name;
  document.getElementById("product-desc").innerText = product.description;
  document.getElementById("product-designers").innerText = designers.join(", ");

  const width = product.measurement.width / 10;
  const length = product.measurement.length / 10;
  const height = product.measurement.height / 10;
  document.getElementById("product-measurement-w").innerText = `${width} cm`;
  document.getElementById("product-measurement-l").innerText = `${length} cm`;
  document.getElementById("product-measurement-h").innerText = `${height} cm`;

  const productImage = document.getElementById("product-image");
  productImage.setAttribute("src", product.imageLink);

  Object.values(product.productEcoLabels).forEach(productEcoLabel => {
    document.getElementById("product-ecolabel").innerHTML += `
        <span data-bs-toggle="tooltip" title="${productEcoLabel.type}">
            <img class="bg-image hover-zoom" src="${productEcoLabel.imageLink}" alt="" id="ecoId">
        </span>`;
  });
}

window.addEventListener("load", async () => {
  await getProduct();
});
