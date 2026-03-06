const express = require("express");
const router = express.Router();


//index - users
router.get("/", (req, res) => {
    res.send("GET for users");
});

//Show - users
router.get("/:id", (req, res) => {
    res.send("GET for users id");
});

//Post-users
router.post("/", (req, res) => {
    res.send("Post for  users");
});


//Delete 
router.delete("/:id", (req, res) => {
    res.send("Delete for user id");
});

module.exports = router;

