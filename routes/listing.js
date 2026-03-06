const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedin, isowner, validateListing} = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });




router.route("/")
  .get(wrapAsync(listingcontroller.index))

  .post(isLoggedin,
    
    upload.single("image"),
    //  validateListing,
   wrapAsync(listingcontroller.createListing));
// .post((req, res) => {
//   res.send(req.file);
// });
   
// New route
router.get("/new", isLoggedin, listingcontroller.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingcontroller.ShowListing)
)

.put(isLoggedin,
    isowner,
    upload.single("image"),
     validateListing,
      wrapAsync(listingcontroller.updateListing)
    )

 .delete(isLoggedin, isowner,
  wrapAsync(listingcontroller.destroyListing));




//Edit Route
router.get("/:id/edit", isLoggedin,
  isowner,
   wrapAsync(listingcontroller.renderEditForm));



  module.exports = router;