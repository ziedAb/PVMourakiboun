const express = require ('express');
const router = express.Router();
const Office = require('../models/Office');


// get a list of non filled circonscription
router.get('/Rout/:circonscription', function(req, res, next){
    Office.find({circonscription: req.params.circonscription ,  filled: { $exists: false }}).then(function(element){
      res.send(element);
    });
});

module.exports = router;
