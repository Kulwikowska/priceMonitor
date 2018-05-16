var mongoose = require("mongoose");

var MonitoringResultsSchema = new mongoose.Schema({
    price: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MonitoringResults", MonitoringResultsSchema);