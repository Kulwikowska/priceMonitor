var request = require("request"),
    cheerio = require('cheerio'),
    URL = require('url-parse'),
    Product = require("../models/product")


module.exports.visitAndCollect = function(url) {
    return new Promise((resolve, reject) => {
        console.log("Visiting page " + url);
        request(url, function(error, response, body) {
            if (error) {
                return reject(error);
            }
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if (response.statusCode >= 400) {
                error = new Error('Http Error');
                error.statusCode = response.statusCode;
                return reject(error)
            }

            var product = collectProductData(body);
            resolve(product);
        })

    });
};

function collectProductData(page) {
    // Parse the document body
    var $ = cheerio.load(page);
    var h4 = $("h4").first().contents().filter(function() {
        return this.nodeType == 3;
    }).text();
    var h1 = $("h1").text();
    var img = $("#galleryImage-0").attr("src");
    var price = Number.parseFloat(h4.match(/\d+((\.|\,)\d{1,2})?/)[0].replace(',', '.'));

    return {
        name: h1,
        price: price,
        image: img
    };
}