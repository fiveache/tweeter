"use strict";
const bcrypt = require('bcrypt');

module.exports = function userHelpers(db, ObjectID) {
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
    },

    checkIfUserExists: function(username, callback) {
      db.collection('users').find({
        'username': username
      }).toArray((err, docs) => {
        if (err) {
          return callback(err);
        }
        if (docs.length === 0) {
          return callback(null, false);
        }
        return callback(null, true);
      });
    },

    createUser: function(username, password, callback) {
      // TODO: This is synchronous: come back....
      const hashed = bcrypt.hashSync(password, 4);
      db.collection('users').insertOne({
        'username': username,
        'password': hashed
      });
      callback(null, true);
    },

    getUserId: function(username, callback) {
      db.collection('users').find({
        'username': username
      }).toArray((err, docs) => {
        if (err) {
          callback(err);
        }
        callback(null, docs[0]._id);
      });
    },

    getUserName: function(userID, callback) {
      db.collection('users').find({
        _id: ObjectID(userID)
      }).toArray((err, docs) => {
        if (err) {
          callback(err);
        }
        callback(null, docs[0].username);
      });
    },

    getUserLikes: function(userID, callback) {
      db.collection('users').find({
        _id: ObjectID(userID)
      }).toArray((err, docs) => {
        if (err) {
          callback(err);
        }
        if (docs[0].likes) {
          callback(null, docs[0].likes);
        } else {
          callback(null, []);
        }
      });
    },

    addUserLikes: function(userID, tweetId, callback) {
      db.collection('users').updateOne({
        _id: ObjectID(userID)
      }, {
        $push: {
          likes: tweetId
        }
      }, (err, docs) => {
        if (err) {
          callback(err);
        }
        callback(null, true);
      });
    },

    removeUserLikes: function(userID, tweetId, callback) {
      db.collection('users').updateOne({
        _id: ObjectID(userID)
      }, {
        $pull: {
          likes: tweetId
        }
      }, (err, docs) => {
        if (err) {
          callback(err);
        }
        callback(null, true);
      });
    }
  }
}
