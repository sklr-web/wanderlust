const express = require("express");
const router = express.Router();

//posts
//index 
router.get("/", (req, res) => {
    res.send("GET for posts");
});

//Show 
router.get("/:id", (req, res) => {
    res.send("GET for post id");
});

//Post 
router.post("/", (req, res) => {
    res.send("Post for  posts");
});


//Delete 
router.delete("/:id", (req, res) => {
    res.send("Delete for post id");
});

module.exports = router;