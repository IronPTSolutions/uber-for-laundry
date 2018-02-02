const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
  res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user != null) {
        res.render('auth/signup', {
          user: user,
          error: { email: 'User already register' }
        });
      } else {
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        user.save()
          .then(() => {
            res.redirect('/login');
          }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('auth/signup', {
                user: user,
                error: error.errors
              });
            } else {
              next(error);
            }
          });
      }
    })
    .catch(error => next(error));
}