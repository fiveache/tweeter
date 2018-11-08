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
  }
}
