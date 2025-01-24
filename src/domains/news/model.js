const mongoose = require("mongoose")
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
    type: [String], // Array of strings for tags
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Create the text index manually
NewsSchema.index({ description: 'text' });

const News = mongoose.model("News", NewsSchema);

module.exports = News;
