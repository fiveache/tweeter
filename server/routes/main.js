const express = require('express');
const main = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(userHelpers) {
  main.get('/', (req, res) => {
    res.render('index', {
      pageName: 'Home'
    });
  });

  main.get('/register', (req, res) => {
    res.render('register', {
      pageName: 'Register',
    })
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
              res.status(500).render('register', {
                pageName: 'Register',
                warning: err,
              });
            }

            if (created) {

              // User Created, do some cookie shit here.

              res.status(200).render('register', {
                pageName: 'Register',
                warning: 'User created.'
              });

            } else {
              // Just to be safe, catch this.
              res.status(500).render('register', {
                pageName: 'Register',
                warning: 'Whoops something went wrong on our end.'
              });
            }
          });
        }
      });
    } else {
      res.status(400).render('register', {
        pageName: 'Register',
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
          // do cookie shit here
          console.log('it worked!');
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
  return main;
}
