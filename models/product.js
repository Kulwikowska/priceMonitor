var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageURL: String,
    createdAt: { type: Date, default: Date.now },
    monitoringResults: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonitoringResults"
    }]
});


module.exports = mongoose.model("Product", ProductSchema);