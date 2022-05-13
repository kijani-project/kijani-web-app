/*console.log("test virker dette")

const productEndpoint = restApi + "/products";
const productTable = document.getElementById("product-page");


const data = await new HttpClient(productEndpoint).get();
createTable(data);



function createTable(data) {
  let table = `<tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Navn</th>
        <th scope="col">Beskrivelse</th>
        <th scope="col">Vare nr.</th>
        <th scope="col">Miljømærke</th>
        <th scope="col">Ref.</th>
        <th scope="col"></th>
     </tr>`;

  // Loop to access all rows
  for (let row of data) {
    table += `<tr id="product-page${row.productId}" >
    <td>${row.productId}</td>
    <td><img src="${row.picture}" class="responsive-image" alt="" height=70 width=70"></td>
    <td>${row.name}</td>
    <td>${row.description}</td>
    <td>${row.itemNumber} </td>
    <td>${row.ecolabels}</td>
    <td>${row.link}</td>
    <td>
      <button type="button" class="btn btn-danger mx-2 pull-right delete-product">Slet</button>
      <button type="button" data-bs-target="#supplier-update-product" data-bs-toggle="modal" class="btn btn-primary pull-right edit-product">Redigér</button>
    </td>
</tr>`;
  }

  productTable.innerHTML = table;
}

/*
async function loadHtmlTemplate(link, elementid) {
  let result = await fetch(link)
  let text = await result.text();

  let domparser = new DOMParser();
  let html = domparser.parseFromString(text, "text/html");

  if ((f = html.body.querySelector('div')) !== null) {
    document.getElementById(elementid).append(f);
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    buildPage();
  });
} else {
  buildPage();
}

async function buildPage() {
  loadHtmlTemplate("./html/navbar.html", 'navbar');
  loadHtmlTemplate("./html/carusel.html", 'carusel');
  await loadHtmlTemplate("./html/movieContainer.html", 'moviecontainer');
  makeMovieList();
}

function buildMovie(movie) {
  console.log(movie.id)
  let movieContainer = document.createElement("div");
  movieContainer.classList.add("col");

  let movieElement = document.createElement("div");
  movieElement.id = movie.id;
  movieElement.classList.add("card");

  //Test
  let movietrailerlink = movie.trailerLink;

  let imagesrc = movie.imagesrc;

  let image = document.createElement("img");
  image.src = imagesrc;
  image.classList.add("card-img-top");
  image.alt = "img/FrenchFriday.png";
  movieElement.append(image);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let cardHeader = document.createElement("h5");
  cardHeader.textContent = movie.title; //title goes here;
  cardHeader.classList.add("movie-title");
  cardBody.append(cardHeader);

  let cardParagraph = document.createElement("p");
  cardParagraph.textContent = "INSERT MOVIE ATTRIBUT DESCRIPTION HERE";
  cardParagraph.classList.add("card-text");
  cardBody.append(cardParagraph);

  const cardButton = document.createElement("button");
  cardButton.textContent = "Læs mere";
  cardButton.classList.add("btn");
  cardButton.classList.add("btn-primary");
  cardButton.setAttribute("data-bs-toggle", "modal");
  cardButton.setAttribute("data-bs-target", "#modalMore-" + movie.id);
  cardBody.append(cardButton);

  const cardButtonLink = document.createElement("button");
  cardButtonLink.textContent = "Se trailer";
  cardButtonLink.classList.add("btn");
  cardButtonLink.classList.add("btn-outline-secondary");
  cardButtonLink.classList.add("mx-2");
  cardButtonLink.setAttribute("data-bs-toggle", "modal");
  cardButtonLink.setAttribute("data-bs-target", "#modalYoutube-" + movie.id);
  cardBody.append(cardButtonLink);

  initModalTrailer();
  initModalMore()

  movieElement.append(cardBody);

  function initModalMore() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "modalMore-" + movie.id;
    modalDiv.classList.add("modal");
    modalDiv.classList.add("fade");
    modalDiv.setAttribute("aria-labelledby", "modalMore-" + movie.id);
    document.body.append(modalDiv);

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-dialog-centered");
    modalDialog.classList.add("modal-lg");
    modalDiv.append(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.append(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.append(modalHeader);

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = movie.title;
    modalHeader.append(modalTitle);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.append(modalBody);

    const contentTable = document.createElement("table");
    contentTable.classList.add("table");
    contentTable.classList.add("table-borderless");

    contentTable.innerHTML = `
  <tr>
    <td>Movie</td>
    <td>${movie.title}</td>
  </tr>
  <tr>
    <td>Year</td>
    <td>${movie.year}</td>
  </tr>
  <tr>
    <td>Country</td>
    <td>${movie.country}</td>
  </tr>
  <tr>
    <td>Language</td>
    <td>${movie.language}</td>
  </tr>
  <tr>
    <td>Duration</td>
    <td>${movie.duration} min.</td>
  </tr>
  <tr>
    <td>Director</td>
    <td>${movie.director}</td>
  </tr>
  <tr>
    <td>Parental Guide</td>
    <td>${movie.parentalGuide}+</td>
  </tr>
`;

    modalBody.append(contentTable);

    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("btn-close");
    modalCloseButton.setAttribute("data-bs-dismiss", "modal");
    modalHeader.append(modalCloseButton);
  }

  function initModalTrailer() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "modalYoutube-" + movie.id;
    modalDiv.classList.add("modal");
    modalDiv.classList.add("fade");
    modalDiv.setAttribute("aria-labelledby", "modalYoutube-" + movie.id);
    document.body.append(modalDiv);

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-dialog-centered");
    modalDialog.classList.add("modal-lg");
    modalDiv.append(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.append(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.append(modalHeader);

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = movie.title;
    modalHeader.append(modalTitle);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.append(modalBody);

    //"https://www.youtube.com/embed/y40LA-5sK4o"

    const youtubeIframe = document.createElement("iframe");
    youtubeIframe.setAttribute("src", movietrailerlink);
    youtubeIframe.setAttribute("width", "100%");
    youtubeIframe.setAttribute("height", "400px");
    youtubeIframe.setAttribute("title", movie.title + " trailer");
    youtubeIframe.setAttribute("frameborder", "0");
    youtubeIframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    youtubeIframe.setAttribute("allowfullscreen", "");
    modalBody.append(youtubeIframe);


    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("btn-close");
    modalCloseButton.setAttribute("data-bs-dismiss", "modal");
    modalHeader.append(modalCloseButton);
  }

  movieElement.append(cardBody);

  movieContainer.append(movieElement);
  return movieContainer;
}

function makeMovieList() {
  fetchMovies();
}

function appendToList(movie) {
  let movieContainer = document.getElementById("movies");
  movieContainer.append(buildMovie(movie));
}

async function fetchMovies() {
  const response = await fetch('http://127.0.0.1:8080/api/movies');
  const resJSON = await response.json();
  console.log(resJSON);
  resJSON.forEach(appendToList);
}*/

