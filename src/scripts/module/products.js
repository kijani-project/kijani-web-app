import {HttpClient} from "src/scripts/module/HttpClient";

//TODO Gennemse kommentarer inden aflevering

//Test
console.log("Er vi i products??");

// Product API endpoint
const productEndpoint = restApi + "/products";

//Data from JSON object

let productId = document.getElementById("");
let supplier = document.getElementById("");
let itemNumber = document.getElementById("");
let name = document.getElementById("product-name");
let description = document.getElementById("");
let subcategories = document.getElementById("");
let co2Measurebility = document.getElementById("");
let tests = document.getElementById("");
let createdAt = document.getElementById("");
let updatedAt = document.getElementById("");
let imageLink = document.getElementById("");
let brochureLink = document.getElementById("");


//Fetching data from API
async function updateCard() {

  const productData = await new HttpClient(productEndpoint).get();
  //createCard(data);
  console.log(productData);
  createCard(productData);
}


//Filling data from fetch into product cards

function createCard(productData){

//productData have JSON objects in a list, that can be collected by envirement variables
//Etc. ${productData[0].name} directly on the object otherwise loop

const cardDiv = document.getElementById("product-row");

let productCard = `<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="https://jacobsenmobler.dk/images/thumbs/0931537.jpeg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${productData[0].name}</p>
      </div>
  </div>
</div>`; //Use speciel quotes ´´, when reading HTML in JavaScript

for (let i = 0; i < 4; i++) {
  cardDiv.innerHTML += productCard;
  //This means, that im filling some HTML in into my cardDiv and the content is from productcard. It needs to be += to append and not overwrite.
}
}

//Update data on pageload

window.addEventListener("load", async () => {
  await updateCard();
});








