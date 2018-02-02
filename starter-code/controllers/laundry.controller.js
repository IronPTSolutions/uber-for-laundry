const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.dashboard = (req, res, next) => {
  res.render('laundry/dashboard');
};

module.exports.doLaunder = (req, res, next) => {
  const fee = req.body.fee
  if (!fee) {
    res.render('laundry/dashboard', {
      error: { fee: 'Fee is required.'}
    });
  } else {
    const user = req.user;
    user.fee = fee;
    user.isLaunder = true;
    user.save()
      .then(() => {
        res.redirect('/dashboard');
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('laundry/dashboard', {
            error: error.errors
          });
        } else {
          next(error);
        }
      })
  }
};