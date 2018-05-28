var schedule = require('node-schedule');
var express = require("express");
var Product = require("../models/product");
var Monitor = require("../monitor/monitor");
var j = schedule.scheduleJob('*/5 * * * *', function() {
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
        } else {
            products.forEach(function(product) {
                Monitor.visitAndCollect(product.url)
                    .then(refreshedProduct => {
                        if (refreshedProduct.price != product.price) {
                            product.price = refreshedProduct.price;
                            product.lastRefreshed = Date.now();
                            product.save();
                        };
                    }).catch(error => {
                        console.log("Error: " + error);
                    });
            });

        };
    });
});