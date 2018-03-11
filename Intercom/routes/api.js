const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();

// get a list of customer from the db
router.get('/customer', (req, res, next) => {
  Customer.aggregate().near({
      near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                  distanceField: "dis",
                  maxDistance: 100000,
                  spherical: true
      }).then(function(customer){
          res.send(customer);
      }).catch(next);
});

// add a new customer to the db
router.post('/customer', (req, res, next) => {
    Customer.create(req.body).then((customer) => {
        res.send(customer);
    }).catch(next);
});

// update customer
router.put('/customer/:id', (req, res) => {
  Customer.findByIdAndUpdate({_id: req.params.id}, req.body).then((customer) => {
    Customer.findOne({_id: req.params.id}).then((customer) => {
      res.send(customer);
    });
  });
});

// delete customer
router.delete('/customer/:id', (req, res, next) => {
  Customer.findByIdAndRemove({_id: req.params.id}).then((customer) => {
    res.send(customer);
  });
});

module.exports = router;
