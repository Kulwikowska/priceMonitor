var express = require("express"),
    request = require("request"),
    cheerio = require('cheerio'),
    URL = require('url-parse')

var pageToVisit = "https://www.zalando.pl/converse-as-ox-can-tenisowki-niskie-czarny-co411a003-802.html";
console.log("Visiting page " + pageToVisit);
request(pageToVisit, function(error, response, body) {
    if (error) {
        console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if (response.statusCode === 200) {
        var product = collectProductData(body);

        console.log(product);
    }
});

function collectProductData(page) {
    // Parse the document body
    var $ = cheerio.load(page);
    var h4 = $("h4").first().contents().filter(function() {
        return this.nodeType == 3;
    }).text();
    var h1 = $("h1").text();
    var img = $("#galleryImage-0").attr("src");
    return {
        price: h4.match(/\d+((\.|\,)\d{1,2})?/)[0],
        name: h1,
        image: img,
    }
}