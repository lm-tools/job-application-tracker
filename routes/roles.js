var express = require('express');
var jobApplicationStates = require('../lib/job_application_states');
var router = new express.Router();
var uuid = require('node-uuid');
var Stately = require('stately.js');

router.get('/', function index(req, res) {
  res.redirect('/roles/new');
});

router.get('/new', function newRole(req, res) {
  res.render('roles-new');
});

router.post('/', function create(req, res) {
  /* eslint no-param-reassign: "off" */
  req.session.roles = req.session.roles || [];
  req.session.roles.unshift({
    id: uuid.v4(),
    title: req.body['role[title]'],
    employer: req.body['role[employer]'],
    state: Stately.machine(jobApplicationStates).getMachineState()
  });
  res.redirect('/');
});

module.exports = router;
