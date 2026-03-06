const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");





const listingSchema = new Schema({
  title:{ 
    type: String,
    required: true,
  },
  description: String,
   image: {
    url: String,
    filename: String,

    // filename: {
    //   type: String,
    //   default: "listingimage",
    // },
    // url: {
    //   type: String,
    //   default:
    //     "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    //   set: (v) =>
    //     v === ""
    //       ? "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    //       : v,
    // },
  },
    
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
   type: Schema.Types.ObjectId,
   ref: "Review",
    }
  ],
  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
  // owner: {
  //  type: Schema.Types.ObjectId,
  //  ref: "user",
  // },
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
  await Review.deleteMany({_id : {$in: listing.reviews}});
  }
  
});




const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


// "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"

// https://images.unsplash.com/photo-1522708323590-d24dbb6b0267