var express = require('express');
var router = new express.Router();

router.get('/', function index(req, res) {
  res.redirect('/roles/new');
});

router.get('/new', function newRole(req, res) {
  res.render('roles-new');
});

router.post('/', function create(req, res) {
  // TODO: Save role somewhere
  res.redirect('/');
});

module.exports = router;
