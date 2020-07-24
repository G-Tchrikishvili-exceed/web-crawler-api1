// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var crawledSchema = new Schema({
//   url: String,
//   h1: Array,
//   h2: Array,
//   h3: Array,
//   links: Array,
//   date_crawled: Date,
// });

// const crawled = mongoose.model('crawled', crawledSchema);

// module.exports = {
//   crawled,
// };

//for testing comment before push

// //// unnecessary comments ^^^^^

//var is deprecated, use let/const insted

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crawledSchema = new Schema({
  url: String,
  h1: Array, // we can specify the type of array items https://mongoosejs.com/docs/schematypes.html#arrays
  h2: Array, //so in this case it is better to do something, like h2: [String]
  h3: Array,
  links: Array,
  date_crawled: Date, // bad naming. as the rule of thumb you can use naming like created_at, updated_at, deleted_at
});

const crawled = mongoose.model('crawledTestcollection', crawledSchema);

module.exports = {
  crawled,
};
