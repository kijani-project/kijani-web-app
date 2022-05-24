import {HttpClient} from "src/scripts/module/HttpClient";

// Supplier Id
const url = new URL(window.location.href);
const supplierId = url.searchParams.get("supplierId");

// Product API endpoint
const supplierEndpoint = restApi + "/suppliers";
const productEndpoint = restApi + "/products"
const categoryEndpoint = restApi + "/categories";
const productEcoLabelsEndpoint = restApi + "/productEcoLabels";
const designersEndpoint = restApi + "/designers"

const productTable = document.getElementById("supplier-table");
const supplierCategory = document.getElementById("supplier-categories");
const updateProductBtn = document.getElementById("supplier-update-save");
const saveProductBtn = document.getElementById("supplier-post-save");

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
  deleteButtons.forEach(el => el.addEventListener('click', async () => {
    let rowId = getRowId(el);

    await deleteProduct(rowId);
  }));
}

function getRowId(el) {
  let productId = el.parentElement.closest("tr").id;
  return productId.split("-").slice(-1).pop();
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

function createTable(products) {
  let table = `<tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Navn</th>
        <th scope="col">Miljømærke</th>
        <th></th>
     </tr>`;

  for (let product of products) {
    let productEcoLabelsNew = [];
    Object.values(product.productEcoLabels).forEach(productEcoLabel => {
       productEcoLabelsNew.push(`
        <span data-bs-toggle="tooltip" title="${productEcoLabel.type}">
            <img class="bg-image product-eco-label-small" src="${productEcoLabel.imageLink}" alt="">
        </span>`);
    });

    let productDesigners = [];
    Object.values(product.designers).forEach(el => {
      productDesigners.push(el.name);
    })

    let ecoTests = []; // Eco tests
    Object.values(product.ecoTests).forEach(el => {
      ecoTests.push(el.name);
    })

    table += `<tr id="supplier-id-${product.productId}" data-bs-toggle="collapse" data-bs-target="#collapseExample-${product.productId}" aria-expanded="false" aria-controls="collapseExample">
    <td>${product.productId}</td>
    <td><img src="${product.imageLink}" class="product-img-small" alt=""></td>
    <td>${product.itemNumber}</td>
    <td>${product.name}</td>
    <td>${productEcoLabelsNew.join(" ")}</td>
    <td class="text-end">
       <i class="fa fa-sort-desc" aria-hidden="true"></i>
    </td>

    <tr class="collapse out" id="collapseExample-${product.productId}"><td colspan="6"><div>

    <div class="row">
      <div class="col-md-2">
        <img src="${product.imageLink}" class="float-start product-img-medium" alt="">
      </div>
      <div class="col-md-5">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
      </div>
      <div class="col-md-3">
      <dl class="row">
        <dt class="col-sm-6">Designer</dt>
        <dd class="col-sm-6">${productDesigners.join(" & ")}</dd>
        <dt class="col-sm-6">Bredde:</dt>
        <dd class="col-sm-6">${product.measurement.width / 10} cm</dd>
        <dt class="col-sm-6">Dybde:</dt>
        <dd class="col-sm-6">${product.measurement.length / 10} cm</dd>
        <dt class="col-sm-6">Højde:</dt>
        <dd class="col-sm-6">${product.measurement.height / 10} cm</dd>
        <dt class="col-sm-6">Miljø-certificering</dt>
        <dd class="col-sm-6">${productEcoLabelsNew.join(" ")}</dd>
      </dl>
      </div>

    <div class="col-md-2">
      <button type="button" class="btn btn-danger pull-right delete-product">Slet</button>
      <button type="button" data-bs-target="#supplier-update-product" data-bs-toggle="modal" class="btn btn-primary pull-right edit-product mx-2 ">Redigér</button>
    </div>
</div>

</div></td></tr></tr>`;
  }

  productTable.innerHTML = table;
}

async function deleteProduct(id) {
  await new HttpClient(productEndpoint + '/' + id).delete();

  await updateTable();
}

async function createProduct(data) {
  await new HttpClient(supplierEndpoint + "/" + supplierId + "/products").post(data);

  await updateTable();
}

async function updateProduct(data, productId) {

  await new HttpClient(productEndpoint + "/" + productId).put(data);

  location.reload(); // reload page to avoid the same event listener to get triggered several times
}

async function addSubCategoriesToDropdown(categories) {
  const categoryOptions = document.querySelectorAll('#supplier-categories option:checked');
  const selectedCategories = Array.from(categoryOptions).map(el => parseInt(el.value));

  const subCategories = document.getElementById("supplier-sub-categories");
  subCategories.innerHTML = "";
  subCategories.parentNode.hidden = false;

  Object.values(categories).forEach(category => {
    if (selectedCategories.includes(category.categoryId)) {
      Object.values(category.subCategories).forEach(subCategory => {
        let option = document.createElement("option");
        option.textContent = `${subCategory.name} (${category.name})`;
        option.value = subCategory.subCategoryId;

        subCategories.append(option);
      })
    }
  });
}

/**
 * Save product when the form is submitted
 */
saveProductBtn.addEventListener("click", async () => {

  const itemNumber = document.getElementById("supplier-item-number");
  const name = document.getElementById("supplier-product-name");
  const description = document.getElementById("supplier-product-description");
  const measurementLength = document.getElementById("supplier-product-measurement-length");
  const measurementWidth = document.getElementById("supplier-product-measurement-width");
  const measurementHeight = document.getElementById("supplier-product-measurement-height");
  const co2Measurability = document.getElementById("supplier-co2-measurability");
  const imageLink = document.getElementById("supplier-image-link");
  const brochureLink = document.getElementById("supplier-brochure-link");

  // Product Eco Labels
  const selectedEcoLabels = document.querySelectorAll('#supplier-product-eco-labels option:checked');
  const productEcoLabels = [];
  Object.values(Array.from(selectedEcoLabels).map(el => el.value)).forEach(val => {
    let obj = {
      "productEcoLabelId": parseInt(val)
    };
    productEcoLabels.push(obj);
  });

  // Designers
  const selectedDesigners = document.querySelectorAll('#supplier-designers option:checked');
  const designers = [];
  Object.values(Array.from(selectedDesigners).map(el => el.value)).forEach(val => {
    let obj = {
      "designerId": parseInt(val)
    };
    designers.push(obj);
  });

  // Sub category
  const selectedSubCategories = document.querySelectorAll('#supplier-sub-categories option:checked');
  const subCategories = [];
  Object.values(Array.from(selectedSubCategories).map(el => el.value)).forEach(val => {
    let obj = {
      "subCategoryId": parseInt(val)
    };
    subCategories.push(obj);
  });

  let product = {
    "productEcoLabels": productEcoLabels,
    "itemNumber": itemNumber.value,
    "name": name.value,
    "description": description.value,
    "designers": designers,
    "measurement": {
      "length": measurementLength.value, "width": measurementWidth.value, "height": measurementHeight.value
    },
    "subCategories": subCategories,
    "co2Measurability": co2Measurability.value,
    "imageLink": imageLink.value,
    "brochureLink": brochureLink.value
  };

  await createProduct(product)
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

  await addProductEcoLabelsToDropdown();
  await addDesignersToDropdown();
});

async function addDesignersToDropdown() {
  const data = await new HttpClient(designersEndpoint).get();
  const designers = document.getElementById("supplier-designers");
  data.sort((a, b) => a.name.localeCompare(b.name)); // Sort from a-z

  Object.values(data).forEach(designer => {
    let option = document.createElement("option");
    option.innerText = designer.name;
    option.value = designer.designerId;

    designers.append(option);
  })
}

async function addProductEcoLabelsToDropdown() {
  const data = await new HttpClient(productEcoLabelsEndpoint).get();
  const ecoLabels = document.getElementById("supplier-product-eco-labels");

  Object.values(data).forEach(ecoLabel => {
    let option = document.createElement("option");
    option.innerText = ecoLabel.type;
    option.value = ecoLabel.productEcoLabelId;

    ecoLabels.append(option);
  })
}

async function addCategoriesToDropdown(data) {

  const categoryNode = document.getElementById("supplier-categories");

  Object.values(data).forEach(category => {
    let option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.categoryId;

    categoryNode.append(option);
  });
}


supplierCategory.addEventListener("click", async () => {
  let data = await new HttpClient(categoryEndpoint).get();

  await addSubCategoriesToDropdown(data);
})
