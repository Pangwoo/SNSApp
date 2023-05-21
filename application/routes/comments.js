var express = require("express");
var router = express.Router();
var db = require('../conf/database');
var {isLoggedIn} = require("../middleware/auth");


router.post("/create", isLoggedIn, async function(req, res, next){
    
    var comment = req.body.comment;
    var { userId, username } = req.session.user;
    var  { postId }  = req.body;
    
    // res.status(201).json(req.body);
    try{
        var [resultObject, fields] = await db.execute(`INSERT INTO comments(text, fk_authorId, fk_postId) value(?,?,?);`,[comment, userId, postId]);
        
        if(resultObject && resultObject.affectedRows == 1){
            return res.status(201).json({
                    commentId: resultObject.insertId,
                    username: username,
                    commentText: comment,
                }
            )        
        }else{
            res,json({
                message: "error"
            }) 
        }
    }catch(error){
        next(error);
    }
});
module.exports = router;

