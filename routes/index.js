var express = require("express");
var router = express.Router();
var passport = require("passport");

//root route 
router.get("/", function(req, res) {
    res.render("index");
});

//show login form 
router.get("/login", function(req, res) {
    res.render("login");
});

module.exports = router;