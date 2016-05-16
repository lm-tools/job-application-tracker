var express = require('express');
var router = new express.Router();

/* GET home page. */
router.get('/', function index(req, res) {
  res.render('index', {
    roles: req.session.roles
  });
});

router.post('/', function progressApplication(req, res) {
  // TODO: 1. Progress job application
  //       2. Update roles state in session
  res.redirect('/');
});

module.exports = router;
