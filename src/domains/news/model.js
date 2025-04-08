const mongoose = require("mongoose");

// const TagSchema = new mongoose.Schema({
//   value: {
//     type: String,
//     required: true,
//   },
//   label: {
//     type: String,
//     required: true,
//   },
//   selected: {
//     type: Boolean,
//     required: true,
//     default: false, // Default value for selected
//   }
// });

const NewsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    index: 'text', // Creates a text index for full-text search
  },
  tags: {
    type: [String], // Array of tag objects
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Create the text index manually
NewsSchema.index({ description: 'text' });

const News = mongoose.model("News", NewsSchema);

module.exports = News;
