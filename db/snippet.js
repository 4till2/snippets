
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema(
  {
    id: Number,
    title: String,
    description: String,
    tags: String,
    jscode: String,
    csscode: String,
    placement: String, 
    author: String 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Snippet", SnippetSchema);
