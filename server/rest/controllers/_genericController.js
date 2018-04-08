var express = require('express');

var createRouter = function(modelName, model, writable, viewMode){
    var router = express.Router();
    var theModel = model;
    var theModelName = modelName;
    var view = viewMode;


    var sendResponse = function(req, res, name, document, view){
        if(!document)
            document = {};
          
        switch(view){
        case 'json':
            res.setHeader('Content-type', 'application/json');
            res.json(document);
            break;
    };

   
    router.get('/', (req,res) => {
        theModel.find().lean().exec(function(err, documents) {
            if (err)
                res.send(err);
            else
                sendResponse(req, res, theModelName, documents, view);
        });
    });
    router.get('/:_id', (req,res) => {
        theModel.findById(req.params._id).lean().exec(function(err, document) {
            if (err)
                res.send(err);
            else
                sendResponse(req, res, theModelName,document,view);
        });
    });

    };
    return router;
}

module.exports = {createRouter};