const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  image: {
    // storing images as URLs for now
    data: Buffer,
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["top", "bottom", "shoes"]
  },
  tags: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Item", ItemSchema);
