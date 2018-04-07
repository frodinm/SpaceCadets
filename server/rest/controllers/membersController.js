var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt');

var createRouter = function(modelName, model, writable, viewMode){
    var router = express.Router();
    var theModel = model;
    var theModelName = modelName;
    var view = viewMode;


    var hashPasswords = function(pass){
        bcrypt.hash(pass, 10, null, function(err, hash, cb) {
            return hash;
        });
    }

    var sendResponse = function(req, res, name, document, view){
        if(!document)
            document = {};
          
        switch(view){
        case 'json':
            res.setHeader('Content-type', 'application/json');
            res.json(document);
            break;
        }
    };

    //Generic function used both to create or update document
    var updateAndSave = function(req, res, name, document, view){
    //cycle through body content to add properties
        var toUpdate = {};
        for(var property in req.body){
            toUpdate[property] = req.body[property];
        }

        // save the new document and check for errors
        theModel.update({_id : document._id}, {$set: toUpdate}, {strict : false}, function(err) {
            if (err)
                res.send(err);
            else{
                sendResponse(req, res, name, toUpdate, view);
            }
        });
    };
    /**
     * @api {get} / Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    router.post('/register', function(req, res,next) {
       theModel.findOne({username:req.body.username},function (err, user) {
        if (err) return handleError(err);
        console.log(!user)
        if(!user){
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                  if (err) return next(err);
                   // Or however suits your setup
                  theModel.create({
                    name:req.body.name,
                    username:req.body.username,
                    password:hash,
                    birthday:req.body.birthday,
                    gender:req.body.gender,
                    keyAccess:req.body.keyAccess,
                    program:req.body.program,
                    profilePicture:req.body.profilePicture,
                    timestamp: new Date().valueOf()
    
                })
                res.send({data: req.body})
                });
              });
        }else{
            res.send({error: 'Username is taken!'})
        }
      })
      });

    router.post('/login',function(req, res, next) {
    
    passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                return res.send({ success : false, message : 'authentication failed',user});
            }else
                return res.send({ success : true, message : 'authentication succeeded', user });
          
        })(req, res, next);
    });

    router.post('/logout', function(req, res){
        res.send({message: 'Logout success'})
        req.logout();
      });

    return router;
};

module.exports = createRouter;