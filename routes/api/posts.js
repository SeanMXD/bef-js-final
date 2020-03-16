var express = require('express');
var router = express.Router();
var models = require('../../models');
var authService = require('../../services/auth');

router.get('/', function (req, res, next) {
  models.posts.findAll({})
    .then(postsFound => res.json(postsFound))
});

router.get('/:id', function (req, res, next) {
  models.posts.findByPk(parseInt(req.params.id))
    .then(postsFound => res.json(postsFound))
});

module.exports = router;