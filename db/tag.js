const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
    {
      id: Number,
      title: String,
      author: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("Tag", TagsSchema);