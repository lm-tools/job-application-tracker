var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function index(req, res) {
  res.render('index', {
    roles: req.session.roles
  });
});

module.exports = router;
