const mongoose = require("mongoose");
const ImageSchema = mongoose.Schema({
  filename: String,
  size: Number,
  mimetype: String,
  path: String,
});

module.exports = mongoose.model("Image", ImageSchema);
