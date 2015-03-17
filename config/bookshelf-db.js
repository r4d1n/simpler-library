var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './dev.sqlite3'
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
