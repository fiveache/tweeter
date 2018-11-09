const express = require('express');
const main = express.Router();

module.exports = (function() {
  main.get('/', (req, res) => {
    res.render('index', {
      pageName: 'Home'
    });
  });

  main.post('/login', (req, res) => {
    console.log(req.body);
  });
  return main;
})();
