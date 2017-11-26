/* global describe before it */
'use strict';
var request = require('supertest');
var path = require('path');
var sinon = require('sinon');
var should = require('should');

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

describe('picturejs api', function() {
    var app;
    
    before(function() {
        app = express();
        //app.set('port', (process.env.PORT || 8080));
        app.set('views', './views');
        app.set('view engine', 'ejs');

        app.use(express.static('./public'));
        app.use(favicon('./public/icons/favicon.ico'));
        app.use(bodyParser.urlencoded({ extended: true }));
        
        var apirouter = express.Router();
        apirouter.get('/', function(req, res) {
            //res.set('Content-Type', 'application/json');
            res.json({ message: 'ok' });   
        });
        var picture = require('../../api/picture');
        picture(apirouter);
        
        app.use('/api', apirouter);
    });
    
    describe('start express and add picture.js api', function() {
        it('should response for /api from get method', function(done) {
            request(app.listen())
                .get('/api')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    //console.log(res);
                    if (err) return done(err);
                    done();
                });
        });
    });
    
    describe('post /api/picture', function() {
        it('should accept a picture', function(done) {
            request(app.listen())
                .post('/api/picture')
                .attach('image', path.join(__dirname, '/resources/betty.png'))
                .expect(200)
                .end(function(err, res) {
                    res.body.should.have.property('success', true);
                    if (err) return done(err);
                    done();
                });
        });
    });
    
    describe('get /api/picture', function() {
        it('should return a picture', function(done) {
            request(app.listen())
                .get('/api/picture')
                .expect(200)
                .end(function(err, res) {
                    //console.log(res.body);
                    res.body.should.have.property('message', 'get ok');
                    if (err) return done(err);
                    done();
                });
        });
    });
});