import {HttpClient} from "src/scripts/module/HttpClient";

// Supplier Id
const url = new URL(window.location.href);
const supplierId = url.searchParams.get("supplierId");

// Product API endpoint
const supplierEndpoint = restApi + "/suppliers";
const productEndpoint = restApi + "/products"
const categoryEndpoint = restApi + "/categories";

const productTable = document.getElementById("supplier-table");

const supplierProductDescription = document.getElementById("supplier-product-description");
const supplierProductName = document.getElementById("supplier-product-name");
const supplierItemNumber = document.getElementById("supplier-item-number");
const supplierBrochureLink = document.getElementById("supplier-link");
const supplierImage = document.getElementById("supplier-image");
const supplierCategory = document.getElementById("supplier-category");
const supplierSubcategory = document.getElementById("supplier-subcategory");

const saveProductBtn = document.getElementById("supplier-post-save");

/**
 * Show table
 * @returns {Promise<void>}
 */
async function updateTable() {
  const data = await new HttpClient(supplierEndpoint + "/" + supplierId + "/products").get();
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
    let rowId = getRowId(el);

    await deleteProduct(rowId);
  }));
}

function getRowId(el) {
  let productId = el.parentElement.closest("tr").id;
  return productId.split("-").slice(-1).pop(); // GET ID
}

/**
 * Delete button event listener
 */
function editButton() {
  const editProductBtn = document.querySelectorAll('.edit-product');

  // Trigger the edit button
  editProductBtn.forEach(el => el.addEventListener('click', async () => {
    let productId = getRowId(el);

    let productName = document.getElementById("supplier-update-product-name");
    let productDescription = document.getElementById("supplier-update-product-description");
    let itemNumber = document.getElementById("supplier-update-item-number");
    let co2Mesurability = document.getElementById("supplier-update-co2-mesurability"); // TODO fix typo
    let imageLink = document.getElementById("supplier-update-image");
    let brochureLink = document.getElementById("supplier-update-link");

    let currentData = await new HttpClient(productEndpoint + "/" + productId).get();

    itemNumber.value = currentData.itemNumber;
    productName.value = currentData.name;
    productDescription.value = currentData.description;
    imageLink.value = currentData.imageLink;
    co2Mesurability.value = currentData.co2Mesurability;
    brochureLink.value = currentData.brochureLink;

    const updateProductBtn = document.getElementById("supplier-update-save");

    updateProductBtn.addEventListener("click", async () => {
      let data = {
        itemNumber: itemNumber.value,
        name: productName.value,
        description: productDescription.value,
        co2Mesurability: co2Mesurability.value,
        imageLink: imageLink.value,
        brochureLink: brochureLink.value
      }

      // Add product to database
      await updateProduct(data, productId)
    });
  }));
}

/**
 * Build the table from a JSON object
 * @param data
 */
function createTable(data) {
  let table = `<tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Navn</th>
        <th scope="col">Miljømærke</th>
        <th></th>
     </tr>`;

  // Loop to access all rows
  for (let row of data) {
    let productEcoLabels = [];
    Object.values(row.productEcoLabels).forEach(el => {
      productEcoLabels.push(el.type)
    });

    let ecoLabelsString = productEcoLabels.join(", ");
    //let designer = row.designer; // TODO use
    //let mesurementsLenght = row.measurement.lenght;
    //let mesurementsWidth = row.measurement.width;
   // let mesurementsHeight = row.measurement.height;
    //  let subCategories = row.subCategories;
    //let co2Mesurability = row.co2Mesurability;
    // let ecoTests


    table += `<tr id="supplier-id-${row.productId}" data-bs-toggle="collapse" data-bs-target="#collapseExample-${row.productId}" aria-expanded="false" aria-controls="collapseExample">
    <td>${row.productId}</td>
    <td><img src="${row.imageLink}" class="zoom" alt="" height=70 width=70"></td>
    <td>${row.itemNumber}</td>
    <td>${row.name}</td>
    <td>${ecoLabelsString}</td>
    <td class="text-end">
       <i class="fa fa-sort-desc" aria-hidden="true"></i>
    </td>

    <tr class="collapse out" id="collapseExample-${row.productId}"><td colspan="6"><div>

    <div class="row">
      <div class="col">
        <img src="${row.imageLink}" class="float-start" alt="" height=200 width=200">
      </div>
      <div class="col-6">
          <p><u>${row.name}</u></p>
          <p>${row.description}</p>
          <p><a href="${row.brochureLink}">Ref. link</a></p>
      </div>
    <div class="col">
      <button type="button" class="btn btn-danger pull-right delete-product">Slet</button>
      <button type="button" data-bs-target="#supplier-update-product" data-bs-toggle="modal" class="btn btn-primary pull-right edit-product mx-2 ">Redigér</button>
    </div>
</div>

</div></td></tr></tr>`;
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

/**
 * Create Product
 * @param data
 * @returns {Promise<void>}
 */
async function createProduct(data) {
  await new HttpClient(supplierEndpoint + "/" + supplierId + "/products").post(data);

  await updateTable();
}

/**
 * Update product
 * @param data
 * @param productId
 * @returns {Promise<void>}
 */
async function updateProduct(data, productId) {

  await new HttpClient(productEndpoint + "/" + productId).put(data);

  location.reload(); // reload page to avoid the same event listener to get triggered several times
}

/**
 * Save product when the form is submitted
 */
saveProductBtn.addEventListener("click", async () => {
  const data = {
    itemNumber: supplierItemNumber.value,
    name: supplierProductName.value,
    description: supplierProductDescription.value,
    imageLink: supplierImage.value,
    brochureLink: supplierBrochureLink.value // TODO: Add missing data
  }

  // Add product to database
  await createProduct(data)
});

/**
 * Build table on page load
 */
window.addEventListener("load", async () => {
  await updateTable();

  let profile = await new HttpClient(supplierEndpoint + "/" + supplierId + "/profile").get();

  document.getElementById("supplier-name").innerText = profile.name;

  let data = await new HttpClient(categoryEndpoint).get();

  await addCategoriesToDropdown(data);
});

async function addCategoriesToDropdown(data) {
  Object.values(data).forEach(el => {
    let option = document.createElement("option");
    option.textContent = el.categoryName;
    option.value = el.id;

    supplierCategory.append(option);
  });
}

async function addSubCategoriesToDropdown(data) {
  supplierSubcategory.innerHTML = "";

  document.getElementById("supplier-subcategory").parentNode.hidden = false; // TODO fix camelcase

  Object.values(data).forEach(category => {

    if (category.categoryName === supplierCategory.textContent) {
      Object.values(category.subCategories).forEach(subCategory => {
        let option = document.createElement("option");
        option.textContent = subCategory.subCategoryName;
        option.value = category.id;

        supplierSubcategory.append(option);
      })
    }
  });
}

supplierCategory.addEventListener("click", async () => {
  let data = await new HttpClient(categoryEndpoint).get();

  await addSubCategoriesToDropdown(data);
})
