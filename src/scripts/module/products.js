import {HttpClient} from "src/scripts/module/HttpClient";

console.log("Er vi i products??");

// Product API endpoint
const productEndpoint = restApi + "/products";


const cardDiv = document.getElementById("product-row");

let productCard = `<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="https://jacobsenmobler.dk/images/thumbs/0931537.jpeg" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
  </div>
</div>`;


for (let i = 0; i < 9; i++) {
  cardDiv.innerHTML += productCard; //This means, that im filling some HTML in into my cardDiv and the content is
  //from productcard. It needs to be += to append and not overwrite.
}











