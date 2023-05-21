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
        try{
            var[rows, fields] = await db.execute(`select id,title,thumbnail,fk_userId from posts where fk_userId=?;`,[userId]);
            res.locals.posts = rows;
            next();
        }catch(error){
            next(error);
        }
        
    },

    getPostById: async function(req,res,next){
        var id = req.params.id;
        try{
            var[rows, fields] = await db.execute(`select u.username, p.video, p.title, p.description, p.id, p.createdAt
            from posts p
            JOIN users u
            ON p.fk_userId = u.id
            WHERE p.id = ?;`,[id]);

            const post = rows[0];
            if(!post){
                req.flash("error", "Invalid Post");
                req.session.save(function(err){
                    return res.redirect("/");
                })
            }else{
                
                res.locals.post = post;
                next();
                
            }
        }catch(error){
            next(error);
        }
        
    },

    getCommentsForPostById: async function(req,res,next){
        const id = req.params.id;
        try{
            var[rows, fields] = await db.execute(
                `select u.username, c.text, c.createdAt
                from comments c
                JOIN users u
                ON c.fk_authorId = u.id
                WHERE c.fk_postId = ?;`,[id]);
            
            if(rows && rows.length>0){
                res.locals.comments = rows;
            }
            next();
        }catch(error){
            next(error);
        }
    },

    getRecentPosts: async function(req,res,next){
        try{
            var[rows, fields] = await db.execute(`SELECT * FROM csc317db.posts ORDER BY createdAt DESC;;`);
            res.locals.posts = rows;
            next();
        }catch(error){
            next(error);
        }
    },

    // getPostBySearch: async function(req,res,next){
    //     var {searchValue} = req.query;
    //     try{
    //         var [idRows, fields] = await db.execute(`SELECT * FROM csc317db.posts where id=?;`, [search]);
    //         var [titleRows, titleFields] = await db.execute(`SELECT * FROM csc317db.posts where title=?;`, [search]);
    //         if(idRows && idRows.length > 0){
    //             res.locals.post = idRows[0];
    //             next();
    //         }
    //         if(titleRows && titleRows.length > 0){
    //             res.locals.post = titleRows[0];
    //             next();
    //         }
    //         else{
    //             req.flash("error", "Invalid Post");
    //             return req.session.save(function(err){
    //                 return res.redirect("/");
    //             })
    //         } 
    //     }catch(error){
    //         next(error);
    //     }
    // },
    deletePostById: async function(req,res,next){
        var { id } = req.params;
        try{
            var [idRows, fields] = await db.execute(`DELETE FROM csc317db.comments where fk_postId=?;`, [id]);
            var [rows, fields] = await db.execute(`DELETE FROM csc317db.posts where id=?;`, [id]);
            req.flash("success", "Post Deleted");
            return req.session.save(function(err){
                return res.redirect(`/users/profile/${req.session.user.userId}`)
            })
        }catch(error){
            next(error);
        }
    }
}