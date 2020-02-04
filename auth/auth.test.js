const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('server', function () {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('POST /api/auth', function () {
        it('register', function (done) {
            request(server)
                .post('/api/auth/register')
                .send({ username: 'john', password: "123" , email: "email"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('register error', function (done) {
            // register user 1
            request(server)
                .post('/api/auth/register')
                .send({
                    username: 'john', password: "123", email: "email" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });

            // register user with the same name
            request(server)
                .post('/api/auth/register')
                .send({ username: 'john', password: "456", email: "email"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('logout', function (done) {
            // register user
            request(server)
                .post('/api/auth/register')
                .send({ username: 'john', password: "123", email: "email"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });

            // login with proper credentials
            request(server)
                .post('/api/auth/login')
                .send({ email: 'john', password: "123" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
                
            request(server)
                .post('/api/auth/logout')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });   
        });
    });
})