const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get user by token
router.get('/User/:token', function(req, res, next){
  jwt.verify(req.params.token, "React Starter Kit", (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return res.send(user);
    });
  });
});

module.exports = router;
