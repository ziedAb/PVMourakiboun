const express = require ('express');
const router = express.Router();
const Office = require('../models/Office');

// get a all filled items from the db
// router.get('/Stats/:filled', function(req, res, next){
//     const filled = req.params.filled === null ? null : req.params.filled
//     Office.find({filled: filled}).then(function(element){
//       res.send(element);
//     });
// });

// get items having n number of filled in circonscription
router.get('/Stats/:circonscription/:filled', function(req, res, next){
    const filled = req.params.filled === null ? null : req.params.filled
    Office.find({circonscription: req.params.circonscription, filled: filled}).then(function(element){
      res.send(element);
    });
});

// get all items in circonscription
router.get('/Stats/:circonscription', function(req, res, next){
    Office.find({circonscription: req.params.circonscription}).then(function(element){
      res.send(element);
    });
});

// where filled not available
router.get('/Stats', function(req, res, next){
    Office.find({ filled: { $exists: false } }).then(function(element){
      res.send(element);
    });
});


module.exports = router;
