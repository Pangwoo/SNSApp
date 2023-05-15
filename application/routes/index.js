var express = require('express');
const {isLoggedIn} = require("../middleware/auth");
const {getRecentPosts} =require("../middleware/posts");
var router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Gwangwoo Lee", js:["fetchMainContents.js"], posts:res.locals.posts});
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
