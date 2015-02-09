var knex = require('../config/database');

var userModel =  {
  setEmail: function(email) {
    this.email = email;
  },
  setPassword: function(password) {
    this.password = "stringpassword--" + password;
  },
  save: function() {
    var promise = knex('users').insert({
      email: this.email,
      password: this.password,
      created_at: new Date(),
      updated_at: new Date()
    })
    return promise;
  },
  load: function(dbUser) {
    this.email = dbUser.email;
    this.id = dbUser.id;
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
      password: "stringpassword--" + password
    })
    .then(function(dbUsers) {
      // console.log(dbUsers);
      // there should only be one because emails are unique
      if (dbUsers.length === 1) {
        var tempUser = User.create();
        tempUser.load(dbUsers[0]);
        return tempUser;
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
      // console.log(dbUsers);
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
