var _ = require('lodash');
var express = require('express');
var jobApplicationStates = require('../lib/job_application_states');
var router = new express.Router();
var Stately = require('stately.js');

/* GET home page. */
router.get('/', function index(req, res) {
  res.render('index', {
    roles: req.session.roles
  });
});

router.post('/', function progressApplication(req, res) {
  var roles = req.session.roles;
  var progressingRoleIndex = _.findIndex(roles, { id: req.body.id });

  // Progress role based on the state and action in the request
  var machine = Stately.machine(jobApplicationStates, req.body.state);
  machine[req.body.action]();

  // Update state of progressing role
  roles[progressingRoleIndex].state = machine.getMachineState();

  res.redirect('/');
});

module.exports = router;
