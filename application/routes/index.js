var express = require('express');
const {isLoggedIn} = require("../middleware/auth");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Gwangwoo Lee", js:["fetchMainContents.js"] });
});

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Log in' });
});

router.get('/registration', function(req, res){
  res.render('registration', { title: 'Registration', js:["validation.js"] });
});

router.get('/profile', function(req, res){
  res.render('profile', { title: 'Profile' });
});

router.get('/viewpost/:id(\\d+)', function(req, res){
    res.render('viewpost', { title: `View Post ${req.params.id}`, js:["viewpost.js"] });
  });
  

// router.use("/postVideo", function(req,res,next){
//   if(req.userIsLoggedIn){
//     next();
//   }else{
//     res.redirect('/users/login');
//   }
// });

router.get('/postVideo',isLoggedIn, function(req, res){
  res.render('postVideo', { title: 'Post Video' });
});




module.exports = router;
