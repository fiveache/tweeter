const express = require('express');
const main = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(userHelpers) {
  main.get('/', (req, res) => {
    if (res.locals.currentUser) {
      const username = userHelpers.getUserName(res.locals.currentUser, (err, username) => {
        res.render('index', {
          pageName: 'Home',
          user: username,
        });
      });
    } else {
      res.render('index', {
        pageName: 'Home'
      });
    }
  });

  main.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      userHelpers.checkIfUserExists(username, (err, userExists) => {
        if (userExists) {
          res.status(409).render('index', {
            pageName: 'Home',
            warning: 'User already exists. Login instead?'
          });
        } else {
          // user does not exist, create user.
          userHelpers.createUser(username, password, (err, created) => {
            if (err) {
              res.status(500).render('index', {
                pageName: 'Home',
                warning: err,
              });
            }

            if (created) {
              userHelpers.getUserId(username, (err, _id) => {
                req.session.userID = _id;
                res.status(200).redirect('/');
              });

            } else {
              // Just to be safe, catch this.
              res.status(500).render('index', {
                pageName: 'Home',
                warning: 'Whoops something went wrong on our end.'
              });
            }
          });
        }
      });
    } else {
      res.status(400).render('index', {
        pageName: 'Home',
        warning: 'Username and Password fields cannot be blank.'
      });
    }
  });

  main.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      userHelpers.confirmUser(username, password, (err, userExists) => {
        if (err) {
          res.status(400).render('index', {
            pageName: 'Home',
            warning: err,
          });
        }
        if (userExists) {
          userHelpers.getUserId(username, (err, _id) => {
            req.session.userID = _id;
            res.status(200).redirect('/');
          });
        } else {
          res.status(400).render('index', {
            pageName: 'Home',
            warning: 'Incorrect password.',
          })
        }
      });
    } else {
      // username and password body is empty:
      res.status(400).render('index', {
        pageName: 'Home',
        warning: 'Login fields cannot be blank.'
      });
    }
  });

  main.post('/logout', (req, res) => {
    if (res.locals.currentUser) {
      req.session.destroy(function(err) {
        if (err) {
          res.status(400).render('index', {
            pageName: 'Home',
            warning: err,
          });
        } else {
          return res.redirect('/');
        }
      })
    } else {
      res.redirect('/');
    }
  });

  main.get('/isLoggedIn', (req, res) => {
    if (res.locals.currentUser) {
      res.status(200).send();
    } else {
      res.status(403).send();
    }
  })

  return main;
}
