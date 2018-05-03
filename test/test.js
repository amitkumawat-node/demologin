var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var request = require('request');
var should = chai.should();
chai.use(chaiHttp);
//Default login
let user = {
  email:'amitkumawat238@gmail.com',
  password:'123456@'
};
describe('*********** Test Cases Start from here **************', function() {
  describe('Login Api testcases', function(){
    it('should have all rquired params', function(done){
          user.should.have.property('email');
          user.should.have.property('password');
          done();
    });
    it('should return 200 status code', function(done){
      chai.request(server)
        .post('/api/register')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
    it('should return 200 status code', function(done){
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
    it('should return Json object', function(done){
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('success');
          done();
        });
    });
    it('should return Success object', function(done){
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('success');
          done();
        });
    });

  });
  
});