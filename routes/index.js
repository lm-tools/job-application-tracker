var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function index(req, res) {
  res.render('index', {
    roles: [
      { title: 'Graphic designer', employer: 'Department of Work and Pensions', status: 'Applied' },
      { title: 'UX designer', employer: 'Facebook', status: 'Interview Scheduled' },
      { title: 'Graphic designer', employer: 'Apple', status: 'No longer interested' }
    ]
  });
});

module.exports = router;
