var express = require('express');
var router = express.Router();
var db = require('../conf/database');


/* GET localhost:3000/users */
// router.get('/', async function(req, res, next) {
//     try{
//       let [rows, fields] = await db.query(`select * from users;`);
//       res.status(200).json({json, fields});
//     }catch(error){
//       next(error);
//     }
// });

// router.use("/registration", function(req, res, next){
  
// })

// router.get('/login', function(req, res){
//   res.render('login');
// })

//localhost:3000/users/registration/
router.post('/registration', async function(req,res,next){
  var {username, email, password} = req.body;
  try{
    var [rows, fields] = await db.execute(`select id from users where username=?;`,[username]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    var [rows, fields] = await db.execute(`select id from users where email=?;`,[email]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    var [resultObject, fields] = await db.execute(`INSERT INTO users(username, email, password) value(?,?,?);`,[username, email, password]);
    if(resultObject && resultObject.affectedRows == 1){
      return res.redirect("/login");
    }else{
      return res.redirect("/registration");
    }
  }catch(error){
    next(error);
  }
});

// router.post('/login', async function(req,res,next){
//   var {username, password} = req.body;
//   try{
//     var [rows, fields] = await db.execute(`SELECT id FROM  csc317db.users where username=? AND password=?;`, [username, password]);
//     if(rows && rows.length > 0){
//       console.log(rows);
//     }
    
//     res.end();
//   }catch(error){
//     next(error);
//   }
// })


module.exports = router;
