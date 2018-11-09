const express = require('express');
const main = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(userHelpers) {
  main.get('/', (req, res) => {
    res.render('index', {
      pageName: 'Home'
    });
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
