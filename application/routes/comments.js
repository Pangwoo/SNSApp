var express = require("express");
var router = express.Router();
var db = require('../conf/database');
var {isLoggedIn} = require("../middleware/auth");


router.post("/add", isLoggedIn, async function(req, res){
    var comment = req.body.comment;
    var { userId } = req.session.user;
    var  postId = 1;
    console.log(comment);
    console.log(userId);
    console.log(postId);
    try{
        var [resultObject, fields] = await db.execute(`INSERT INTO comments(text, fk_authorId, fk_postId) value(?,?,?);`,[comment, userId, postId]);
        if(resultObject && resultObject.affectedRows){
            req.flash("success", "Your comment was created!");
            return req.session.save(function(error){
                if(error) next(error);
                return res.redirect(`/posts/${postId}`);
            })
        }else{
            next(new Error('Comment could not be created'));
        }
    }catch(error){
        next(error);
    }
    return res.redirect(`/posts/${postId}`);
});

module.exports = router;

