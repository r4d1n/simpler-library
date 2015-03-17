var sequelize = require('sequelize-db.js');


var Book = sequelize.define('book', {
  convertDate: function(integer) {
    var date = new Date();
    date.setTime(integer);
    return date;
  },
});



function booksIndex(query, sortColumn) {
  sortColumn = sortColumn || "id";
  if (query) {
    return knex('books').where('tags', 'like', "%" + knex.raw(query) + "%").orderBy(sortColumn, "desc")
  } else {
    return knex('books')
    .join('users', 'books.user_id', 'users.id')
    .orderBy(sortColumn, "desc")
    .select('books.*', 'users.user_name');
  }
}
