const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
