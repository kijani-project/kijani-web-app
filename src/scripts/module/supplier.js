import {HttpClient} from "src/scripts/module/HttpClient";

// Product API endpoint
const productEndpoint = restApi + "/products";

const productTable = document.getElementById("supplier");

const supplierProductDescription = document.getElementById("supplier-product-description");
const supplierProductId = document.getElementById("supplier-product-id");
const supplierItemNumber = document.getElementById("supplier-item-number");
const supplierEcolabels = document.getElementById("supplier-ecolabels");
const supplierLink = document.getElementById("supplier-link");

const saveProductBtn = document.getElementById("supplier-post-save");

/**
 * Show table
 * @returns {Promise<void>}
 */
async function updateTable() {

  const data = await new HttpClient(productEndpoint).get();
  createTable(data);

  // Delete button eventlister
  deleteButton();

  // Edit button eventlister
  editButton();
}

/**
 * Delete button event listener
 */
function deleteButton() {
  const deleteButtons = document.querySelectorAll('.delete-product');

  // Trigger the delete button
  deleteButtons.forEach(el => el.addEventListener('click', async () => {
    let productId = el.parentElement.closest("tr").id;

    let rowId = productId.split("-").slice(-1).pop();

    await deleteProduct(rowId);
  }));
}

/**
 * Delete button event listener
 */
function editButton() {
  const deleteButtons = document.querySelectorAll('.edit-product');

  // Trigger the edit button
  deleteButtons.forEach(el => el.addEventListener('click', async () => {
    let productId = el.parentElement.closest("tr").id;

    let rowId = productId.split("-").slice(-1).pop();

    const data = {
      productId: rowId,
      name: supplierProductId.value,
      description: supplierProductDescription.value,
      itemNumber: supplierItemNumber.value,
      ecolabels: supplierEcolabels.value,
      link: supplierLink.value
    }

    await editProduct(data);
  }));
}

/**
 * Build the table from a JSON object
 * @param data
 */
function createTable(data) {
  let table = `<tr>
        <th scope="col">#</th>
        <th scope="col">Navn</th>
        <th scope="col">Beskrivelse</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Miljømærke</th>
        <th scope="col">Ref.</th>
        <th scope="col"></th>
     </tr>`;

  // Loop to access all rows
  for (let row of data) {
    table += `<tr id="supplier-id-${row.productId}">
    <td>${row.productId}</td>
    <td>${row.name}</td>
    <td>${row.description}</td>
    <td>${row.itemNumber} </td>
    <td>${row.ecolabels}</td>
    <td>${row.link}</td>
    <td>
      <button type="button" class="btn btn-danger mx-2 pull-right delete-product">Slet</button>
      <button type="button" class="btn btn-primary pull-right edit-product">Redigér</button>
    </td>
</tr>`;
  }

  productTable.innerHTML = table;
}

/**
 * Delete product by ID
 * @param id
 * @returns {Promise<void>}
 */
async function deleteProduct(id) {
  await new HttpClient(productEndpoint + '/' + id).delete();

  await updateTable();
}

async function editProduct(data) {
  await new HttpClient(productEndpoint + '/' + data.id).put(data);

  await updateTable();
}

/**
 * Create Product
 * @param data
 * @returns {Promise<void>}
 */
async function createProduct(data) {
  await new HttpClient(productEndpoint).post(data);

  await updateTable();
}

/**
 * Save product when the form is submitted
 */
saveProductBtn.addEventListener("click", async () => {
  const data = {
    name: supplierProductId.value,
    description: supplierProductDescription.value,
    itemNumber: supplierItemNumber.value,
    ecolabels: supplierEcolabels.value,
    link: supplierLink.value
  }

  // Add product to database
  await createProduct(data)
});

/**
 * Build table on page load
 */
window.addEventListener("load", async () => {
  await updateTable();
});
