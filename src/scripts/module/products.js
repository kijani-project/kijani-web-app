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
  createCard1(productData);
  createDropdown(productData);
}

//productData have JSON objects in a list, that can be collected by envirement variables
//Etc. ${productData[0].name} directly on the object otherwise loop
function createCard(productData) {
  const cardDiv = document.getElementById("product-row");
  const cardDiv1 = document.getElementById("product-row1");
  let productCard;
  for (let i = 0; i < 4; i++) {
    productCard = `<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="${productData[i].imageLink}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${productData[i].name}</p>
        <p class="card-text">${productData[i].brochureLink}</p>
        <p class="card-text">${productData[i].description}</p>

      </div>
  </div>
</div>`; //Use speciel quotes ´´, when reading HTML in JavaScript
    cardDiv.innerHTML += productCard;
    cardDiv1.innerHTML += productCard;

    //This means, that im filling some HTML in into my cardDiv and the content is from productcard. It needs to be += to append and not overwrite.
  }
}

function createDropdown(productData) {
  for (let i = 0; i < productData.length; i++) {
  //Dropdown 1
  const dropdownList1 = document.getElementById("dropdownList1");
  let dropdownElements1;
    dropdownElements1 = document.createElement("li");
    dropdownElements1.textContent = productData[i].name; //Testing need categories, certificat fetch etc from backend.
    dropdownList1.append(dropdownElements1);

  //Dropdown 2
  const dropdownList2 = document.getElementById("dropdownList2");
  let dropdownElements2;
    dropdownElements2 = document.createElement("li");
    dropdownElements2.textContent = productData[i].name; //Testing need categories, certificat fetch etc from backend.
    dropdownList2.append(dropdownElements2);

    //Dropdown 3
    const dropdownList3 = document.getElementById("dropdownList3");
    let dropdownElements3;
    dropdownElements3 = document.createElement("li");
    dropdownElements3.textContent = productData[i].name; //Testing need categories, certificat fetch etc from backend.
    dropdownList3.append(dropdownElements3);

    //Dropdown 4
    const dropdownList4 = document.getElementById("dropdownList4");
    let dropdownElements4;
    dropdownElements4 = document.createElement("li");
    dropdownElements4.textContent = productData[i].name; //Testing need categories, certificat fetch etc from backend.
    dropdownList4.append(dropdownElements4);

    //Dropdown 5
    const dropdownList5 = document.getElementById("dropdownList5");
    let dropdownElements5;
    dropdownElements5 = document.createElement("li");
    dropdownElements5.textContent = productData[i].name; //Testing need categories, certificat fetch etc from backend.
    dropdownList5.append(dropdownElements5);
  }
}

//Update data on pageload
    window.addEventListener("load", async () => {
      await updateCard();
    });








