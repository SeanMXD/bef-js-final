var express = require('express');
var router = express.Router();
var axios = require('axios')
var models = require('../models');
var authService = require('../services/auth');

router.get('/', function(req, res, next) {
  res.json({message: 'Respond with a resource.'})
})
router.get('/admin', function (req, res, next) {
    axios.get(`http://localhost:3000/api/users/admin`,  
    {
        headers:{
            Cookie: `${req.cookies.jwt ? "jwt=${req.cookies.jwt}" : ""}`
        }
    }).then(response => {console.log(response);res.render('users/admin', {Users: response.data})})
    .catch(err => res.send(err))
    
});
router.post('/signup', function (req, res, next) {
});
router.post('/login', function (req, res, next) {
});
router.get('/logout', function (req, res, next) {
});
router.get('/admin/editUser/:id', function (req, res, next) {
});

module.exports = router;