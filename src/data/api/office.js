const express = require ('express');
const router = express.Router();
const Office = require('../models/Office');

// get a list from the db
router.get('/Office/:circonscription', function(req, res, next){
    Office.findOne({number: req.params.circonscription}).then(function(element){
      res.send(element);
    });
});

// add a new entry to the db
router.post('/Office', function(req, res, next){
    Office.create(req.body).then(function(test){
        res.send(test);
    }).catch(next);
});

router.put('/Office/:id', function(req, res, next){
    Office.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Office.findOne({_id: req.params.id}).then(function(elt){
            res.send(elt);
        });
    }).catch(next);
});

module.exports = router;
