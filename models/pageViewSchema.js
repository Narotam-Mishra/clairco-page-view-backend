// Page View Data model

const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  id: String,
  created_at: Date,
  page: {
    title: String,
    description: String,
    tags: [String],
  },
  user: {
    id: String,
    created_at: Date,
  },
});

module.exports = mongoose.model("PageView", pageViewSchema);
