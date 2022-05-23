import {HttpClient} from "src/scripts/module/HttpClient";

const url = new URL(window.location.href);
const productParam = url.searchParams.get("productId");
const productEndpoint = restApi + "/products";




async function getProduct() {
  const product = await new HttpClient(productEndpoint + "/" + productParam).get();

  console.log(product);

  let name = product.name;
  let image = product.imageLink;
  let desc = product.description;
 // let designer = Object.values(product.designers.name).join(", ");
  let ecolabel = product.productEcoLabels.type;
  let width = product.measurement.width;
  let length= product.measurement.length;
  let height = product.measurement.height;
  document.getElementById("product-name").innerText=  name;
  document.getElementById("product-header").innerText=  name;
  document.getElementById("product-desc").innerText=  desc;
  //document.getElementById("product-designers").innerText=  designer;
  document.getElementById("product-ecolabel").innerText=  ecolabel;
  document.getElementById("product-mesurement-w").innerText=  width;
  document.getElementById("product-mesurement-l").innerText=  length;
  document.getElementById("product-mesurement-h").innerText=  height;




  console.log(name);
  console.log(image);
  console.log(desc);
  console.log(ecolabel + "ecolabel");
}
window.addEventListener("load",async () => {
  await getProduct();
});
