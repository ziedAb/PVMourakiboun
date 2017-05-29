const express = require ('express');
const router = express.Router();
const Circonscription = require('../models/Circonscription');

// get circonscription from the db
router.get('/Circonscription/:circonscription', function(req, res, next){
    Circonscription.findOne({name: req.params.circonscription}).then(function(element){
      res.send(element);
    });
});

// get circonscription from the db
router.get('/Circonscription', function(req, res, next){
    Circonscription.find({}).then(function(result){
      res.send(result);
    });
});

module.exports = router;
