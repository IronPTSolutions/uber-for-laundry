const LaundryPickup = require('../models/laundry-pickup.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.dashboard = (req, res, next) => {

  const criteria = req.user.isLaunderer ? 
    { launderer: req.user._id } :
    { user: req.user._id };
  
  LaundryPickup.find()
    .populate('user')
    .populate('launderer')
    .sort('date')
    .then(pickups => {
      res.render('laundry/dashboard', {
        pickups: pickups
      });      
    })
    .catch(error => next(error));
};

module.exports.launders = (req, res, next) => {
  User.find({ isLaunderer: true})
    .then(launderers => {
      res.render('laundry/launderers', {
        launderers: launderers
      });
    })
    .catch(error => next(error));
}

module.exports.doLaunder = (req, res, next) => {
  const fee = req.body.fee
  if (!fee) {
    res.render('laundry/dashboard', {
      error: { fee: 'Fee is required.'}
    });
  } else {
    const user = req.user;
    user.fee = fee;
    user.isLaunderer = true;
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

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .then(launder => {
      res.render('laundry/launderer-profile', {
        theLaunderer: launder
      });
    })
    .catch(error => next(error));
}

module.exports.schedulePickup = (req, res, next) => {
  const laundryPickup = new LaundryPickup({
    date: req.body.date,
    user: req.user._id,
    launderer: req.params.id
  });

  laundryPickup.save()
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch(error => next(error));
}