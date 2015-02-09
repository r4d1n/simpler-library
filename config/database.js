var knex = require('knex')({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './dev.sqlite3'
  }
});

module.exports = knex;
