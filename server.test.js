process.env.NODE_ENV = 'test';

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);
const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);

describe('Server', () => {
  beforeEach((done) => {
    database.migrate.rollback()
  .then(() => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
      .then(() => {
        done();
      });
    });
  });
  });

  afterEach(function(done) {
   database.migrate.rollback()
   .then(function() {
     done();
   });
 });

  it('should exist', () => {
    expect(app).to.exist;
  });

  describe('GET /', () => {
    it('should return a 200 and html', (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
    });
  });

      //  ARTISTS TEST

  describe('GET /api/v1/artists', () => {
    it('should return all artists', (done) => {
      chai.request(app)
      .get('/api/v1/artists')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(30);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('POST /api/v1/artists', () => {
  context('if POST is done properly', () => {
    it('should add a new artist', (done) => {
      chai.request(app)
        .post('/api/v1/artists')
        .send({
          id: 31,
          name: 'Muddy Waters'
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(31);
          expect(res.body[30].name).to.equal('Muddy Waters');
          expect(res.body[30].id).to.equal(31);
          done();
        });
    });
  })
  context('if POST is not done properly', () => {
    it('should reject with a 404', (done) => {
      chai.request(app)
        .post('/api/v1/artists')
        .send({
          nam: 'Muddy Waters',
          ido: 31
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          done();
        });
    });
  })
});
