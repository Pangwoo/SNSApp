var pathToFFMPEG = require("ffmpeg-static");
var exec = require("child_process").exec;
var db = require('../conf/database');

module.exports = {
    makeThumbnail: function(req, res, next){

        if(!req.file){
            next(new Error('File upload failed'));
        }else{
            try{
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split(".")[0]}.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();    
            }catch(error){
                next(error);
            }
            
        }
    },
    
    getPostsForUserBy: async function(req,res,next){
        const userId = req.session.user.userId;
        var[rows, fields] = await db.execute(`select id,title,thumbnail,fk_userId from posts where fk_userId=?;`,[userId]);
        res.locals.posts = rows;
        next();
    },

    getPostById: async function(req,res,next){
        const id = req.params.id;
        
        var[rows, fields] = await db.execute(`select * from posts where id=?;`,[id]);
        if(rows && rows.length>0){
            var[users, fields] = await db.execute(`select username from users where id=?;`,[rows[0].fk_userId]);
            rows[0].createdAt = `${rows[0].createdAt.getMonth()}-${rows[0].createdAt.getDate()} ${rows[0].createdAt.getHours()}`;
            rows[0].username = users[0].username;
            res.locals.post = rows[0];
            console.log(rows[0]);
        }
        next();
    },

    getCommentsForPostById: async function(req,res,next){
        const id = req.params.id;
        var[rows, fields] = await db.execute(`select * from comments where fk_postId=?;`,[id]);
        rows.forEach(async function(ele) {
            var {fk_authorId} = ele;
            console.log(fk_authorId);

            var[user, fieldss] = await db.execute(`select username from users where id=?;`, [fk_authorId]);
            ele.username = user[0].username;
        });
        if(rows && rows.length>0){
            res.locals.comments = rows;
        }
        next();
    },

    getRecentPosts: async function(req,res,next){
        var[rows, fields] = await db.execute(`SELECT * FROM csc317db.posts ORDER BY createdAt DESC;;`);
        res.locals.posts = rows;
        next();
    },

    getPostBySearch: async function(req,res,next){
        var search = req.body.search;
        var [idRows, fields] = await db.execute(`SELECT * FROM csc317db.posts where id=?;`, [search]);
        var [titleRows, titleFields] = await db.execute(`SELECT * FROM csc317db.posts where title=?;`, [search]);
        if(idRows && idRows.length > 0){
            res.locals.post = idRows[0];
            next();
        }
        if(titleRows && titleRows.length > 0){
            res.locals.post = titleRows[0];
            next();
        }
        else{
            req.flash("error", "There is no such a post");
            next();
        } 
    } ,
}