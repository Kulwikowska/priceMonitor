var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Monitor = require("../monitor/monitor");
var Product = require("../models/product");
var middleware = require("../middleware");



//index route
router.get("/products", middleware.isLoggedIn, function(req, res) {

    // Get all products from DB
    Product.find({ owner: req.user._id }).populate("owner").exec(function(err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            req.flash("succes", "Welcome in your dashboard!");
            res.render("./home/dashboard", { products: allProducts });
        }
    });
});


//form route
router.get("/products/new", middleware.isLoggedIn, function(req, res) {
    res.render("home/new");
});

//create route
router.post("/products", middleware.isLoggedIn, function(req, res) {
    var product = Monitor.visitAndCollect(req.body.url)
        .then(product => {
            var newProduct = { name: product.name, price: product.price, image: product.image, url: req.body.url, owner: req.user._id }
            console.log(newProduct);
            Product.create(newProduct, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(product);
                    req.flash("success", "New product added");
                    res.redirect("/products");
                }
            })
        }).catch(error => {
            console.log("Error: " + error);
        });
});

// price refresh
router.put("/products/:id", middleware.isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            console.log(err);
            res.redirect("/products");
        } else {
            Monitor.visitAndCollect(product.url)
                .then(refreshedProduct => {
                    if (refreshedProduct.price != product.price) {
                        product.price = refreshedProduct.price;
                        product.lastRefreshed = Date.now();
                        product.save();
                    };
                    res.redirect("/products");
                }).catch(error => {
                    console.log("Error: " + error);
                });
        };
    });
});

//destroy route
router.delete("/products/:id", function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/products");
        } else {
            req.flash("success", "Succesfully removed!");
            res.redirect("/products");
        }
    });
});

module.exports = router;