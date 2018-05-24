var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Product = require("./models/product"),
    http = require('http'),
    request = require("request"),
    cheerio = require('cheerio'),
    URL = require('url-parse')


mongoose.connect("mongodb://localhost/crowler");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use('/libs', express.static(__dirname + "/node_modules"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secret word",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes 
indexRoutes = require("./routes/index");
dashboardRoutes = require("./routes/dashboard");

app.use("/", indexRoutes);
app.use("/", dashboardRoutes);

app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});