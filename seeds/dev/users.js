var bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
            id: 1
          , username: 'admin'
          , password: bcrypt.hashSync('admin', null, null)
          , firstName: 'Eries'
          , lastName: 'Trisnadi'
          , email: 'admin@admin.com'
          , birth: new Date('1996/05/05')
          , level: 1
          , remember_token: null
        })
      ]);
    });
};
