const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
    {
      value: String,
      label: String,
    }
);

module.exports = mongoose.model("Tag", TagsSchema);