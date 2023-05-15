var validator = require('validator');
var db = require("../conf/database");

module.exports = {
    usernameCheck: function(req, res, next){
        var {username} = req.body;
        username = username.trim();
        if(!validator.isLength(username, {min:3}) ){
            req.flash("error", "username must be 3 or more characters");
        }
        if(!/[a-zA-Z]/.test(username.charAt(0))){
            req.flash("error", "username must begin with a character");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    passwordCheck: function(req, res, next){
        var { password } = req.body;
        password = password.trim();
        if(!validator.isStrongPassword(password, {minLength:8})){
            req.flash("error", "password must be 8 or more characters");
        }
        if(!validator.isStrongPassword(password, {minUppercase: 1})){
            req.flash("error", "password must include at least 1 upper case letter");
        }
        if(!validator.isStrongPassword(password, {minNumbers: 1} )){
            req.flash("error", "password must include at least 1 number");
        }
        if(!validator.isStrongPassword(password, {minSymbols: 1} )){
            req.flash("error", "password must include at least 1 special character");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    emailCheck: function(req, res, next){
        var { email } = req.body;
        email = email.trim();
        if(!validator.isEmail(email)){
            req.flash("error", "email must be valid");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    tosCheck: function(req, res, next){
        var { tos } = req.body;
        if(!(tos === 'on')){
            req.flash("error", "User must accept TOS and Privacy Rules");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    ageCheck: function(req, res, next){
        var { age } = req.body;
        if(!(age === 'on')){
            req.flash("error", "User must be older than 13");
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    isUsernameUnique: async function(req, res, next){
        var {username} = req.body;
        try{
            var [rows, fields] = await db.execute(`select id from users where username=?;`,[username]);
    
            if(rows && rows.length > 0){
                req.flash("error", `${username} is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        }catch(error){
            next(error);
        };
    },

    isEmailUnique: async function(req, res, next){
        var {email} = req.body;
        try{
            var [rows, fields] = await db.execute(`select id from users where email=?;`,[email]);
    
            if(rows && rows.length > 0){
                req.flash("error", `${email} is already taken`);
                return req.session.save(function(err){
                    return res.redirect('/registration');
                });
            }else{
                next();
            }
        }catch(error){
            next(error);
        }
    }
}