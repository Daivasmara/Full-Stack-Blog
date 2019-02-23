const monk = require('monk');
const db = monk('localhost/blog');

module.exports = db;