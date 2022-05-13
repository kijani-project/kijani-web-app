// Config
import 'src/scripts/config/config'

// Vendors
import 'src/scripts/vendor/bootstrap'

// Modules
if (document.querySelectorAll("#supplier-page").length) {
  import("src/scripts/module/supplier")
}
