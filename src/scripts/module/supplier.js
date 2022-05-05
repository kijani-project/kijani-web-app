// api url
apiUrl = restApi + "/products";

async function getapi(apiUrl) {
  // Storing response
  const response = await fetch(apiUrl);

  // Storing data in form of JSON
  let data = await response.json();

  show(data);
}

// Defining async function

// Calling that async function
getapi(apiUrl);

// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<tr>
        <th scope="col">#</th>
        <th scope="col">Navn</th>
        <th scope="col">Beskrivelse</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Miljømærke</th>
        <th scope="col">Ref.</th>
     </tr>`;

  // Loop to access all rows
  for (let r of data) {
    tab += `<tr>
    <td>${r.productId} </td>
    <td>${r.name}</td>
    <td>${r.description}</td>
    <td>${r.itemNumber} </td>
    <td>${r.ecolabels}</td>
    <td>${r.link}</td>
</tr>`;
  }

  // Setting innerHTML as tab variable
  document.getElementById("supplier").innerHTML = tab;
}
