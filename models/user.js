var knex = require('../config/database');
var bcrypt = require('bcrypt');

var userModel =  {
  setEmail: function(email) {
    this.email = email;
  },
  setPassword: function(password) {
    this.pwHash = bcrypt.hashSync(password, 8);
  },
  save: function() {
    var promise = knex('users').insert({
      email: this.email,
      password: this.pwHash,
      created_at: new Date(),
      updated_at: new Date()
    })
    return promise;
  },
  load: function(dbUser) {
    this.email = dbUser.email;
    this.id = dbUser.id;
    this.hash = dbUser.password;
  }
}

var User = {
  create: function() {
    return Object.create(userModel);
  },
  login: function(email, password) {
    // if (email === undefined || email === "") {
    //   throw "Must provide email";
    // }
    return knex('users')
    .where({
      email: email,
    })
    .then(function(users) {
      console.log(users);
      // there should only be one because emails are unique
      if (users.length === 1) {
        var tempUser = User.create();
        tempUser.load(users[0]);
        if (bcrypt.compareSync(password, tempUser.hash)) {
          return tempUser
        }
      } else {
        throw "User Not Found";
      }
    })
  },
  find: function(id) {
    return knex('users')
    .where({
      id: id
    })
    .then(function(dbUsers) {
      // there should only be one because emails are unique
      if (dbUsers.length === 1) {
        var tempUser = User.create();
        tempUser.load(dbUsers[0]);
        return tempUser;
      } else {
        throw "User Not Found";
      }
    })
  }
};

module.exports = User;
