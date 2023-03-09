const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Git Users', () => {
  describe('GET /api/users', () => {
    it('should return a list of users', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should return a list of users since 10', (done) => {
        chai.request(app)
          .get('/api/users?since=10')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
  });
  describe('GET /api/users/:username/details', () => {
    it('should return Augusto informations', (done) => {
      chai.request(app)
        .get('/api/users/AugustoCarniel1/details')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('GET /api/users/:username/repos', () => {
    it('should return Augusto informations', (done) => {
      chai.request(app)
        .get('/api/users/AugustoCarniel1/repos')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});

