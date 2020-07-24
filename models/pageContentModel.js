const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crawledSchema = new Schema({
  url: String,
  h1: [String],
  h2: [String],
  h3: [String],
  links: [String],
  created_at: Date,
});

const crawled = mongoose.model('crawled', crawledSchema);

module.exports = {
  crawled,
};
