var express = require("express");
var router = express.Router();
var multer = require("multer");
var db = require('../conf/database');

const { makeThumbnail, getPostById, getPostBySearch, getCommentsForPostById, deletePostById } = require("../middleware/posts");
const { isLoggedIn } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/videos/uploads')
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
  })
  
  const upload = multer({ storage: storage });



router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function(req,res,next){
    var {title, description} = req.body;
    var {path, thumbnail} = req.file;
    var { userId } = req.session.user;

    try{
        var [insertResult, _ ] = await db.execute(`INSERT INTO posts (title, description, video, thumbnail, fk_userId) value (?,?,?,?,?);`, [title, description, path, thumbnail, userId]);
        if(insertResult && insertResult.affectedRows){
            req.flash("success", "Your post was created!");
            return req.session.save(function(error){
                if(error) next(error);
                return res.redirect(`/`);
            })
        }else{
            next(new Error('Post could not be created'));
        }
    }catch(error){
        next(error);
    }
});

router.get('/:id(\\d+)',getPostById, getCommentsForPostById, function(req, res){
    res.render('viewpost', { title: `View Post ${req.params.id}`, post:res.locals.post, comments:res.locals.comments });
  });


// router.post("/search", getPostBySearch, function(req, res, next){
//     if(res.locals.post){
//         return res.redirect(`/posts/${res.locals.post.id}`);
//     }
//     else{
//         return res.redirect('/');
//     }
// });

//in class
router.get("/search", async function (req, res, next) {
    
    var {searchValue} = req.query;
    try{
        var [rows, _ ] = await db.execute(
            `select id,title,thumbnail, concat_ws(' ', title, description) as haystack 
            from posts
            having haystack like ?;`,[`%${searchValue}%`]
        );

        if(rows && rows.length == 0){
            req.flash("error", "Invalid Post");
                return req.session.save(function(err){
                    return res.redirect("/");
            })
        }else{
            res.locals.posts = rows;
            return res.render('index', {posts:res.locals.posts});
        }
    }catch(error){
        next(error);
    }
})

router.post("/delete/:id(\\d+)", deletePostById, function(req,res,next){
    var {userId} = req.session.user;
    return res.redirect(`/users/profile/${userId}`);
  });
  

module.exports = router;