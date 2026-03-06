const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
 const allListings = await Listing.find({})
 res.render("listings/index", {allListings});
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.ShowListing = async (req, res) => {
 let {id} = req.params; 
 const listing = await Listing.findById(id)
 .populate({
  path: "reviews",
 populate: {
  path: "author",
 },
 })

 .populate("owner");
 if(!listing) {
 req.flash("error", "Request Does Not Exist");
 return res.redirect("/listings");
 }
 
 res.render("listings/show.ejs", {listing});
};


// module.exports.createListing = async (req, res) => {

//   console.log("STEP 1: controller reached");

//   if (!req.body.listing) {
//     console.log("STEP 2: no listing body");
//     return res.status(400).send("Invalid listing data");
//   }

//   console.log("STEP 3: body ok");

//   const newListing = new Listing(req.body.listing);

//   newListing.owner = req.user._id;

//   if (req.file) {
//     console.log("STEP 4: file exists");

//     newListing.image = {
//       url: req.file.path,
//       filename: req.file.filename
//     };
//   }

//   console.log("STEP 5: saving");

//   await newListing.save();

//   console.log("STEP 6: saved");

//   req.flash("success", "New Listing Created");

//   res.redirect("/listings");

//   console.log("STEP 7: redirect sent");
// };


// module.exports.createListing = async (req, res) => {
//   let url = req.file.path;
//   let filename = req.file.filename;

//     if (!req.body.listing) {
//       return res.status(400).send("Invalid listing data");
//     }
    
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = {url, filename};
//     await newListing.save();
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
//   };

module.exports.createListing = async (req, res) => {

  if (!req.body.listing) {
    return res.status(400).send("Invalid listing data");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
  }

  await newListing.save();

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};



  module.exports.renderEditForm = async (req, res) => {
   let {id} = req.params; 
   const listing = await Listing.findById(id);
    if(!listing) {
   req.flash("error", "Request Does Not Exist");
   return res.redirect("/listings");
   }
   res.render("listings/edit.ejs", {listing});
    };

    module.exports.updateListing = async (req, res) => {
         let {id} = req.params; 
         let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
            if(typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
           listing.image = {url, filename};
           await listing.save();
            }
          req.flash("success", "Listing Updated");
          res.redirect (`/listings/${id}`);
      };

      module.exports.destroyListing = async (req, res) => {
     let {id} = req.params; 
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  };