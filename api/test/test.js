process.env.NODE_ENV = 'test';

const mongoose = require('mongoose')
const Rate = require('../models/rate')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
chai.use(chaiHttp)
const should = chai.should()

describe('GET rates', () => {
  it('should get all rates', (done) => {
      chai.request(server)
      .get('/rates')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0)
        err.to.be.null
        done()
      })
  })
})