const express = require ('express');
const router = express.Router();
const Office = require('../models/Office');

// get a list from the db
router.get('/OfficeError/:circonscription', function(req, res, next){
    Office.find({error: true, circonscription: req.params.circonscription}).then(function(elements){
      res.send(elements);
    });
});

module.exports = router;
