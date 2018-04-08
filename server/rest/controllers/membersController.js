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

    function insertDocument(doc, targetCollection) {

        while (1) {
    
            var cursor = targetCollection.find( {}, { _id: 1 } ).sort( { _id: -1 } ).limit(1).cursor();

            console.log(cursor)
    
            var seq = cursor ? cursor.next()._id + 1 : 1;
    
            doc._id = seq;
    
            targetCollection.create(doc);
    
    
            break;
        }
    }
    

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
    
    router.post('/photo',function(req,res){
        var newItem = new theModel();
        newItem.photo.data = fs.readFileSync(req.files.userPhoto.path)
        newItem.photo.contentType = 'image/png';
        newItem.save();
       });

    router.post('/register', function(req, res,next) {
    theModel.findOne({name:req.body.name},function (err, user) {
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
                    profession: req.body.profession,
                    location: { longitude: req.body.location.longitude, latitude: req.body.location.latitude },
                    profilePicture:req.body.profilePicture,
                    timestamp: new Date().valueOf()
                    })
    
                })
                res.send({data: req.body})
                });
              }else{
            res.send({error: 'User exists!'})
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