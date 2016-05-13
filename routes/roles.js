var express = require('express');
var router = new express.Router();

router.get('/', function index(req, res) {
  res.redirect('/roles/new');
});

router.get('/new', function newRole(req, res) {
  res.render('roles-new');
});

router.post('/', function create(req, res) {
  /* eslint no-param-reassign: "off" */
  req.session.roles = req.session.roles || [];
  req.session.roles.push({
    title: req.body['role[title]'],
    employer: req.body['role[employer]'],
    status: 'Interested'
  });
  res.redirect('/');
});

module.exports = router;
