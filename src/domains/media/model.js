const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  file: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'audio', 'document'], // example of allowed media types
  },
  createdAt: { type: Date, default: Date.now },  // Date.now without parentheses
});

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
