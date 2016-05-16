var _ = require('lodash');
var express = require('express');
var jobApplicationStates = require('../lib/job_application_states');
var router = new express.Router();
var Stately = require('stately.js');


var RolesView = function (roles) {
  function formatStateQuestion(state) {
    return _.capitalize(state.replace(/_/g, ' ')) + ' ?';
  }

  function lookupStatus(state) {
    switch (state) {
      case 'HAVE_YOU_DONE_EVERYTHING_YOU_NEED_TO_APPLY':
      case 'ARE_YOU_STILL_INTERESTED_IN_PREPARING_TO_APPLYING':
      case 'HAVE_YOU_APPLIED':
      case 'ARE_YOU_STILL_INTERESTED_IN_APPLYING':
        return 'Interested';

      case 'HAVE_YOU_HEARD_BACK_YET':
      case 'ARE_YOU_STILL_INTERESTED_IN_HEARING_BACK':
      case 'HAVE_YOU_TRIED_FOLLOWING_UP_ABOUT_HEADING_BACK':
      case 'HAVE_YOU_SCHEDULED_AN_INTERVIEW':
      case 'ARE_YOU_STILL_INTERESTED_IN_SCHEDULING_AN_INTERVIEW':
      case 'HAVE_YOU_TRIED_FOLLOWING_UP_ABOUT_SCHEDULING_AN_INTERVIEW':
        return 'Applied';

      case 'ARE_YOU_READY_FOR_YOUR_INTERVIEW':
      case 'HAVE_YOU_INTERVIEWED_YET':
      case 'HAVE_YOU_RECEIVED_AN_OFFER':
      case 'ARE_YOU_STILL_INTERESTED_IN_RECEIVING_AN_OFFER':
      case 'HAVE_YOU_TRIED_FOLLOWING_UP_ABOUT_RECEIVING_AN_OFFER':
        return 'Interviewing';

      case 'SUCCEEDED':
      case 'ABANDONED':
      default:
        return '';
    }
  }

  return _.map(roles, function (role) {
    return _.extend({
      stateQuestion: formatStateQuestion(role.state),
      status: lookupStatus(role.state)
    }, role);
  });
};

/* GET home page. */
router.get('/', function index(req, res) {
  res.render('index', {
    roles: new RolesView(req.session.roles)
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
