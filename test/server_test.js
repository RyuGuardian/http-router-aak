'use_strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../server');

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

  it("should greet for named urls", function(done) {
    chai.request(host)
      .get('/saul')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql('Hello, saul');
        done();
      });
  });

  it("should not like numbers (and other symbols)", function(done) {
    chai.request(host)
      .get('/345')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(400);
        expect(res.text).to.eql('Not a valid name. Nice try.');
        done();
      });
  });
});
