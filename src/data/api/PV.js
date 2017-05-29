const express = require ('express');
const router = express.Router();
const PV = require('../models/PV');

// add a new entry to the db
router.post('/PV', function(req, res, next){
    PV.create(req.body).then(function(test){
        res.send(test);
    }).catch(next);
});

// get PV by office number
router.get('/PV/:office', function(req, res, next){
    PV.find({office: req.params.office}).then(function(element){
        res.send(element);
    }).catch(next);
});

// get PV by circonscription
router.get('/PVcirc/:circonscription', function(req, res, next){
    PV.find({circonscription: req.params.circonscription}).then(function(element){
        res.send(element);
    }).catch(next);
});

// update all PVs of this matching office
router.put('/PV/:id', function(req, res, next){
    PV.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        PV.findOne({_id: req.params.id}).then(function(elt){
            res.send(elt);
        });
    }).catch(next);
});

module.exports = router;
