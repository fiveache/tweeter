const express = require('express');
const main = express.Router();

module.exports = function() {
  main.get('/', (req, res) => {
    res.render('index', {
      pageName: 'Home'
    });
  });
  return main;
}
