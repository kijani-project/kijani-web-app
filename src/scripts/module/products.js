import {HttpClient} from "src/scripts/module/HttpClient";

//TODO Gennemse og slet kommentarer inden aflevering

//Test
console.log("Er vi i products??");

// Product API endpoint
const productEndpoint = restApi + "/products";

//Fetching data from API
async function updateCard() {
  const productData = await new HttpClient(productEndpoint).get();
  //createCard(data);
  console.log(productData);
  createCard(productData);
}


//Filling data from fetch into product cards

//productData have JSON objects in a list, that can be collected by envirement variables
//Etc. ${productData[0].name} directly on the object otherwise loop
function createCard(productData) {
  const cardDiv = document.getElementById("product-row");
  let productCard;
  for (let i = 0; i < 4; i++) {
    productCard = `<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="${productData[i].imageLink}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${productData[i].name}</p>
      </div>
  </div>
</div>`; //Use speciel quotes ´´, when reading HTML in JavaScript
    cardDiv.innerHTML += productCard;

    //This means, that im filling some HTML in into my cardDiv and the content is from productcard. It needs to be += to append and not overwrite.
  }
}










//Update data on pageload
window.addEventListener("load", async () => {
  await updateCard();
});









