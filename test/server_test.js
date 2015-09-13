'use_strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../lib/server');
var fs = require('fs');

var host = 'localhost:3000';

describe('HTTP server', function() {
  it("should respond to a request", function(done) {
    chai.request(host)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it("should respond with the time", function(done) {
    chai.request(host)
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(Date().toString());
        done();
      });
  });

  it("should save body in JSON file", function(done) {
    chai.request(host)
      .post('/body')
      .send({hello: 'world'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(fs.existsSync(__dirname + '/../data/request' + (fs.readdirSync(__dirname + '/../data').length - 1) + '.json')).to.eql(true);
        done();
      });
  });
});
