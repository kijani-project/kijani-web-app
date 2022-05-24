export class ProductCard {

  constructor(product) {
    this.product = product;
  }

  create() {
    let description = this.textEllipsis(this.product.description, productDescriptionCard);
    //This is the id
    let prodId = this.product.productId;
    return `<div class="col-md-${12 / productsPerRow} pb-xl-5">
    <div class="card mx-auto">
      <a href="${window.location.origin}/produkt-info.html?productId=${prodId}"><img src="${this.product.imageLink}" class="card-img-top" alt="" loading="lazy"></a>
        <div class="card-body">
          <p class="card-text"><strong>${this.product.name}</strong></p>
          <p class="card-text">${description}</p>
        </div>
    </div>
  </div>`;
  }

  textEllipsis(str, maxLength, {side = "end", ellipsis = "..."} = {}) {
    if (str.length > maxLength) {
      switch (side) {
        case "start":
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case "end":
        default:
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }

    return str;
  }
}
