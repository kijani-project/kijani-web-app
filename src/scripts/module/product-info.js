import {HttpClient} from "src/scripts/module/HttpClient";

const url = new URL(window.location.href);
const productParam = url.searchParams.get("productId");
const productEndpoint = restApi + "/products";


async function getProduct() {
  const product = await new HttpClient(productEndpoint + "/" + productParam).get();

  console.log(product);

  let name = product.name;
  let desc = product.description;
  let designers = [];
  Object.values(product.designers).forEach(designer => {designers.push (designer.name)});
  //let ecolabel = product.productEcoLabels[0].type;
  let width = product.measurement.width;
  let length= product.measurement.length;
  let height = product.measurement.height;
  document.getElementById("product-name").innerText= name;
  document.getElementById("product-header").innerText= name;
  document.getElementById("product-desc").innerText= desc;
  document.getElementById("product-designers").innerText= designers.join(", ");
  //let productEcolabel= document.getElementById("product-ecolabel");
  document.getElementById("product-measurement-w").innerText= width;
  document.getElementById("product-measurement-l").innerText= length;
  document.getElementById("product-measurement-h").innerText= height;
  let productImage = document.getElementById("product-image");
  productImage.setAttribute("src",product.imageLink)
  //productEcolabel.innerHTML=`<span>${product.productEcoLabels[0].type} </span><img src="${product.productEcoLabels[0].imageLink}">`
  //let ecolabelImg = document.getElementById("product-ecolabelImg");
  //ecolabelImg.setAttribute("src",product.productEcoLabels[0].imageLink)
  let ecolabelImg= [];
  Object.values(product.productEcoLabels.type).forEach(ecolabel => {ecolabelImg.push (ecolabel.type)});
  document.getElementById("product-ecolabelImg").innerText= ecolabel.join(", ");



  console.log(name);
  console.log(ecolabelImg);
  console.log(ecolabel + "= ecolabel");

}
window.addEventListener("load",async () => {
  await getProduct();
});
