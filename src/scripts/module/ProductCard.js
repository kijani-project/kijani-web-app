export class ProductCard {

  constructor(product) {
    this.product = product;
  }

  create() {
    let description = this.textEllipsis(this.product.description, productDescriptionCard);

    if (this.product !== undefined) {
      return `<div class="col-${12 / productsPerRow} pb-xl-5">
      <div class="card mx-auto">
        <img src="${this.product.imageLink}" class="card-img-top" alt="" loading="lazy">
          <div class="card-body">
            <p class="card-text"><strong>${this.product.name}</strong></p>
            <p class="card-text">${description}</p>
          </div>
      </div>
    </div>`;
    }
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