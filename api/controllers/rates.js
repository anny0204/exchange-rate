const mongoose = require('mongoose')
const Rate = require('../models/rate')

exports.rates_get_all = (req, res, next) => {
  Rate.find()
    .select('_id pair buy sell')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        rates: docs.map(doc => {
          const deltaBuy = -0.1 + Math.random() * 0.2
          const deltaSell = -0.1 + Math.random() * 0.2
          return {
            _id: doc._id,
            pair: doc.pair,
            buy: Math.round((doc.buy + doc.buy * deltaBuy) * 1000) / 1000,
            sell: Math.round((doc.sell + doc.sell * deltaSell) * 1000) / 1000
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      console.dir(err)
      res.status(500).json({
        erroe: err
      })
    })
}

exports.rates_create_rate = (req, res, next) => {
  const rate = new Rate({
    _id: new mongoose.Types.ObjectId(),
    pair: req.body.pair,
    buy: req.body.buy,
    sell: req.body.sell
  })
  rate
    .save()
    .then(result => {
      console.dir(result)
      res.status(201).json({
        message: 'Created rate successfully',
        createdRate: {
          _id: result._id,
          pair: result.pair,
          buy: result.buy,
          sell: result.sell
        },
        request: {
          type: 'GET',
          url: 'http://localhost:8080/rates'
        }
      })
    })
    .catch(err => {
      console.dir(err)
      res.status(500).json({
        error: err
      })
    })
}
