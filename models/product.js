var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    url: String,
    name: String,
    price: Number,
    image: String,
    lastRefreshed: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Product", ProductSchema);