// Config
import 'src/scripts/config/config'

// Vendors
import 'src/scripts/vendor/bootstrap'

// Modules
import 'src/scripts/module/header'

if (document.querySelectorAll("#supplier-page").length) {
  import("src/scripts/module/supplier")
}

if (document.querySelectorAll("#home-page").length) {
  import("src/scripts/module/home")
}

if (document.querySelectorAll("#product-page").length) {
  import("src/scripts/module/products")
}

if (document.querySelectorAll("#product-info").length) {
  import("src/scripts/module/product-info")
}
