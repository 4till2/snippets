
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema(
  {
    title: String,
    description: String,
    tags: Array,
    jscode: String,
    csscode: String,
    placement: String, 
    author: String 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Snippet", SnippetSchema);
