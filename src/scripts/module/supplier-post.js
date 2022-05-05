apiUrl = restApi + "/products";

function post(data) {
  const header = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
  fetch(apiUrl, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    }
  ).then(response => response.json());
}

const element = document.querySelector("#supplier-post-save");

element.addEventListener("click", () => {
  let data = {
    name: document.getElementById("supplier-product-id").value,
    description: document.getElementById("supplier-product-description").value,
    // productId: document.getElementById("supplier-product-id").value,
    //supplierId: document.getElementById("supplier-product-id").value,
    itemNumber: document.getElementById("supplier-item-number").value,
    ecolabels: document.getElementById("supplier-ecolabels").value,
    //picture: document.getElementById("").value,
    link: document.getElementById("supplier-link").value
  }

  post(data)
});
