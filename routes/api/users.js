var express = require('express');
var router = express.Router();
var models = require('../../models');
var authService = require('../../services/auth');

router.get('/', function(req, res, next) {
  res.json({message: 'Respond with a resource.'})
})

router.get('/admin', function (req, res, next) {
  if(!req.cookies.jwt) // <---- If no JWT cookie exists...
    res.status(401).json({message: 'Must be logged in.'}); // <---- respond with status code 401 ('Must be logged in.').
    let token = req.cookies.jwt;
    authService.verifyUser(token)
    .then(user => {
      console.log("EEEEEEEEEE")
      if (!user) // <---- If no user is found...
      res.status(401).json({message: 'Must be logged in'}); // <---- respond with status code 401 ('Must be logged in.').
      
      if (!user.Admin) // <---- If user is not an admin...
      res.status(401).json({message: 'Insufficient privileges'}); // <---- respond with status code 401 ('Insufficient privileges').
      
      if (user.Admin) // <---- If user is an admin
      models.users.findAll( // <---- Find all users...
        {attributes: ['UserId','FirstName','LastName','Admin','Deleted']}) // <---- but only get the columns UserId, FirstName, LastName, Admin, and Deleted...
        .then(usersFound => res.json(usersFound)); // <---- and respond with this data.
        
    });
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json({message: 'User successfully created'});
      } else {
        res.json({message: 'This user already exists'});
      }
    });
});

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(401).json({message: 'User not found'});
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.json({message: 'Login successful'});
      } else {
        res.json({message: 'Wrong password'});
      }
    }
  });
});
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.json({message: 'Logged out'});
  });

router.get('/profile', function (req, res, next) { 
  if(!req.cookies.jwt) res.status(401).json({message: 'Must be logged in.'}) // <---- If no JWT cookie exists, respond with status code 401 ('Must be logged in.')
  let token = req.cookies.jwt; // <---- Set token variable to JWT cookie value
  authService.verifyUser(token) // <---- Ask authService to verifyUser(token)
    .then(user => {
      if (user) { // <---- If user logged in...
        models.users.findByPk(user.UserId, // <---- Find user info in database...
          {
            attributes: ['UserId','FirstName','LastName','Username', 'Email'], // <---- requesting only certain columns...
          })
          .then(userFound => { // <---- then store user found.
            
            models.posts.findAll({where: {UserId: userFound.UserId}}) // <---- Find all post created by the user...
                .then(postsFound => res.json({UserInfo: userFound, Posts: postsFound})); // <---- then respond to the client with User Info and Posts
          });
      } else { // <---- If user not logged in...
        res.status(401).json({message: 'Must be logged in.'}); // <---- respond with status code 401 ('Must be logged in.')
      }
    })
});


router.get('/admin/editUser/:id', function (req, res, next) {
  if(!req.cookies.jwt) // <---- If no JWT cookie exists...
    res.status(401).json({message: 'Must be logged in.'}); // <---- respond with status code 401 ('Must be logged in.').
  let token = req.cookies.jwt; // <---- Set token variable to JWT cookie value
  authService.verifyUser(token) // <---- Ask authService to verifyUser(token)
    .then(user => {
      if (!user) // <---- If no user is found...
        res.status(401).json({message: 'Must be logged in'}); // <---- respond with status code 401 ('Must be logged in.').
      
        if (!user.Admin) // <---- If user is not an admin...
        res.status(401).json({message: 'Insufficient privileges'}); // <---- respond with status code 401 ('Insufficient privileges').
      
        
        if (user.Admin) {// <---- If user is an admin
          models.users.findByPk(parseInt(req.params.id), // <---- Find user by id parameter...
            {
              attributes: ['FirstName','LastName','Username', 'Email', 'Admin', 'Deleted'], // <---- only requestion certain columns...
            }) 
            .then(userFound => {
              models.posts.findAll({where: {UserId: userFound.UserId}}) // <---- Find all post created by the user...
              .then(postsFound => res.json({ UserInfo: userFound, Posts: postsFound })) // <---- then send User Info and Posts.
            })
        }
          
    });
});

module.exports = router;