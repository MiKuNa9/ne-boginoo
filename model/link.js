const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  Long: {
    type: String,
  },
  Short: {
    type: String,
  },
});
const Link = mongoose.model("links", linkSchema);
module.exports = Link;
