var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crawledSchema = new Schema({
  url: String,
  h1: Array,
  h2: Array,
  h3: Array,
  links: Array,
  date_crawled: Date,
});

const crawled = mongoose.model('crawled', crawledSchema);

module.exports = {
  crawled,
};
