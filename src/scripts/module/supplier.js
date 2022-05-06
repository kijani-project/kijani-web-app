// Product API endpoint
const productEndpoint = restApi + "/products";

const productTable = document.getElementById("supplier");

const supplierProductDescription = document.getElementById("supplier-product-description");
const supplierProductId = document.getElementById("supplier-product-id");
const supplierItemNumber = document.getElementById("supplier-item-number");
const supplierEcolabels = document.getElementById("supplier-ecolabels");
const supplierLink = document.getElementById("supplier-link");

const saveProductBtn = document.getElementById("supplier-post-save");


async function showTable(apiUrl) {
  // Storing response
  const response = await fetch(apiUrl);

  // Storing data in form of JSON
  let data = await response.json();

  show(data);
}

/**
 * Create innerHTML of table
 */
function show(data) {
  let table = `<tr>
        <th scope="col">#</th>
        <th scope="col">Navn</th>
        <th scope="col">Beskrivelse</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Miljømærke</th>
        <th scope="col">Ref.</th>
        <th scope="col">Rediger</th>
        <th scope="col">Slet</th>
     </tr>`;

  // Loop to access all rows
  for (let r of data) {
    table += `<tr>
    <td>${r.productId}</td>
    <td>${r.name}</td>
    <td>${r.description}</td>
    <td>${r.itemNumber} </td>
    <td>${r.ecolabels}</td>
    <td>${r.link}</td>
    <td><button type="button" class="btn btn-primary">Rediger</button></td>
    <td><button type="button" class="btn btn-danger">Slet</button></td>
</tr>`;
  }

  productTable.innerHTML = table;
}

/**
 * Create new product
 */
function createProduct(data) {
  const header = {
    'Accept': 'application/json', 'Content-type': 'application/json'
  }
  fetch(productEndpoint, {
    method: 'POST', headers: header, body: JSON.stringify(data)
  }).then(response => response.json());
}

/**
 * Do create product on click event
 */
saveProductBtn.addEventListener("click", () => {
  let data = {
    name: supplierProductId.value,
    description: supplierProductDescription.value,
    itemNumber: supplierItemNumber.value,
    ecolabels: supplierEcolabels.value,
    link: supplierLink.value
  }

  // Add product to database
  createProduct(data)

  // Refresh table
  showTable(productEndpoint);
});

// Generate table on page load
showTable(productEndpoint);
