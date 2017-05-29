const express = require ('express');
const router = express.Router();
const PV = require('../models/PV');


router.get('/Suivi', function(req, res, next){
    PV.find({})
    .populate({ path: 'filledBy', select: 'name' })
    .exec(function (err, pvs) {
      if (err) return handleError(err);
      const today = new Date().toDateString();

      let counts = [];
      for(const i of pvs) {
        const inserted = i.inserted.toDateString(),
              incrementToday =  inserted === today ? true : false,
              u = i.filledBy.name;

        let thiselement = counts.find(function(user, index){
          return user.name === u;
        });

        if (thiselement !== undefined){
          thiselement.total+=1;
          if (incrementToday){
            thiselement.today+=1;
          }
        }
        else{
          counts.push({
            "name": u,
            "total": 1,
            "today": incrementToday === true ? 1 : 0
          })
        }
      }

      res.send(counts);
    })
});

module.exports = router;
