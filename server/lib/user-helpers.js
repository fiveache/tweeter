"use strict";
const bcrypt = require('bcrypt');

module.exports = function userHelpers(db) {
  return {
    confirmUser: function(username, password, callback) {
      db.collection('users').find({
        'username': username
      }).toArray((err, docs) => {
        if (err) {
          return callback(err);
        }
        if (docs.length === 0) {
          const err = new Error('User does not exist');
          return callback(err);
        }

        bcrypt.compare(password, docs[0].password)
          .then((res) => {
            if (res) {
              return callback(null, true);
            } else {
              return callback(null, false);
            }
          });
      })


    }

  }
}
