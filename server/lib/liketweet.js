module.exports = function makeLikeTweetsHelper(db, ObjectId) {
    return {
      likeTweet: function(twid, callback) {
        db.collection('tweets').updateOne({
          _id: ObjectId(twid)
        }, {
          $inc: {
            "likes": 1
          }
        }, (err, result) => {
          if (err) {
            callback(err);
          }
          callback(null, true);
        });
      },

      unlikeTweet: function(twid, callback) {
        db.collection('tweets').updateOne({
          _id: ObjectId(twid)
        }, {
          $inc: {
            "likes": -1,
          }
        }, (err, result) => {
          if (err) {
            callback(err);
          }
          callback(null, true);
        });
      },

      isAuthorsTweet: function(twid, userid, callback) {
        db.collection('tweets').find({
            _id: ObjectId(twid)
          }).toArray((err, docs) => {
            if (err) {
              callback(err);
            }
            const creator = docs[0].user.name;
            db.collection('users').find({
                _id: ObjectId(userid)
              }).toArray((err, docs) => {
                if (err) {
                  callback(err)
                }
                const username = docs[0].username;
                callback(null, creator === username);
              })
          });
        }
      }
    }
