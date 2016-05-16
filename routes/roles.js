var express = require('express');
var router = new express.Router();
var uuid = require('node-uuid');

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
    id: uuid.v4(),
    title: req.body['role[title]'],
    employer: req.body['role[employer]'],
    state: 'HAVE_YOU_DONE_EVERYTHING_YOU_NEED_TO_APPLY'
  });
  res.redirect('/');
});

module.exports = router;
