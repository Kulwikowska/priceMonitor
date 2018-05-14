var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override")

mongoose.connect("mongodb://localhost/crowler");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use('/libs', express.static(__dirname + "/node_modules"));
app.use(methodOverride("_method"));

//requiring routes 
indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});