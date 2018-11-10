"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers, UserHelpers, LikeTweetsHelper) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      const isLoggedIn = res.locals.currentUser !== undefined;
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        if (!isLoggedIn) {

          res.json({
            tweets,
            isLoggedIn
          });
        } else {
          UserHelpers.getUserLikes(res.locals.currentUser, (err, likes) => {
            if (err) {
              res.status(500).json({
                error: err.message
              });
            };
            res.json({
              tweets,
              isLoggedIn,
              likes
            });
          });
        };
      }
    })
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!res.locals.currentUser) {
      res.status(401).json({
        error: 'invalid request: must be logged in.'
      });
      return;
    } else {
      if (!req.body.text) {
        res.status(400).json({
          error: 'invalid request: no data in POST body'
        });
        return;
      }

      const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
      UserHelpers.getUserName(res.locals.currentUser, (err, username) => {
        if (err) {
          console.log(err);
        }

        // Edit this later:
        user.name = username;
        user.handle = `@${username}`;

        const tweet = {
          user: user,
          content: {
            text: req.body.text
          },
          created_at: Date.now(),
          likes: 0,
        };

        DataHelpers.saveTweet(tweet, (err) => {
          if (err) {
            res.status(500).json({
              error: err.message
            });
          } else {
            res.status(201).send();
          }
        });
      });

    }
  });

  tweetsRoutes.post("/like", (req, res) => {
    const tweetId = req.body.id;
    const currentUser = res.locals.currentUser;
    if (!currentUser) {
      res.status(401).json({
        error: 'invalid request: must be logged in.'
      });
    } else {
      UserHelpers.getUserLikes(currentUser, (err, likes) => {
        if (likes.includes(tweetId)) {
          UserHelpers.removeUserLikes(currentUser, tweetId, (err, removed) => {
            if (err) {
              res.status(500).json({
                error: err.message
              });
            }
            LikeTweetsHelper.unlikeTweet(tweetId, () => {
              if (err) {
                res.status(500).json({
                  error: err.message
                });
              }
              res.status(204).send();
            })
          });
        } else {
          LikeTweetsHelper.likeTweet(tweetId, (err, data) => {
            if (err) {
              res.status(500).json({
                error: err.message
              });
            } else {
              UserHelpers.addUserLikes(res.locals.currentUser, tweetId, (err, update) => {
                if (err) {
                  res.status(500).json({
                    error: err.message
                  });
                } else {
                  res.status(201).send();
                }
              });
            }
          });
        }
      });
    }
  });


  return tweetsRoutes;
}
