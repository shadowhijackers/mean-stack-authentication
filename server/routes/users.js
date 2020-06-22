var express = require('express');

var auth = require('../middlewares/auth');
var Users = require('../models/users');
var crypto = require('../services/crypto');

var router = express.Router();

router.get('/', auth, function(req, res, next) {
  Users.getUsers({}).then((result)=>{
    res.status(200).send({
      data: result
    });
  }).catch((err)=>{
    res.status(400).send({
      error: err.error
    });
  })

});

router.post('/login', function (req, res) {

  const user = req.body;

  Users.getUser(user.email).then((userDoc)=>{

    if(!userDoc){
      res.status(200).send({
        error: 'Entered invalid email'
      });
      return;
    }

    crypto.comparePassword(user.password, userDoc.password, (err, result)=>{

      if(err || !result){
        res.status(200).send({
          error: 'Entered Wrong password'
        });
        return;
      }

      delete userDoc.password;
      res.status(202).send({
        token: crypto.generateToken(userDoc._id),
        data: userDoc
      })

    });

  }).catch((error)=>{

    res.status(400).send({
      error: 'Something went wrong'
    });

  });

});

router.post('/register', function (req,res) {

  const user = req.body;

  Users.getUser(user.email).then((userDoc)=>{

    if(userDoc){
      res.status(200).send({
        error: 'Entered email already exists'
      });
      return;
    }

    Users.saveUser(new Users(user)).then((result)=>{
      delete  result.password;
      res.status(202).send({
        token: crypto.generateToken(result._id),
        data: result
      })
    }).catch((error)=>{

      res.status(400).send({
        error: error.error
      });

    });

  }).catch((error)=>{

    res.status(400).send({
      error: 'Something went wrong'
    });

  });
});

module.exports = router;
