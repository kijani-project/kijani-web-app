// Config
import 'src/scripts/config/config'

// Vendors
import 'src/scripts/vendor/bootstrap'

// Modules
if (document.querySelectorAll("#supplier").length) {
  import("src/scripts/module/supplier")
}
