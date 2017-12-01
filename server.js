
var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
var auth = require('./api/auth');
var app = express();

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

  // app.use(express.static('public'));
  // app.use(express.cookieParser());
  // app.use(express.bodyParser());
  // app.use(express.session({ secret: 'keyboard cat' }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(app.router);
  
  
//   var session = require("express-session"),
//     bodyParser = require("body-parser");

// app.use(express.static("public"));
// app.use(session({ secret: "cats" }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());


app.set('port', (process.env.PORT || 8080));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/icons/favicon.ico'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(auth);

//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(compression());
var apirouter = express.Router();
apirouter.get('/', function(req, res) {
    res.json({ message: 'Please contact developer for API docs.' });   
});
    
var testapi = require('./api/testapi');
testapi(apirouter);

var picture = require('./api/picture');
picture(apirouter);

app.use('/api', apirouter);

app.use('/api2', require('./api/testapi2'));

// var apirouter = express.Router();
// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// apirouter.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });
// apirouter.route('/textformat').post(function(req, res) {
//   //console.log(req);
//   console.log(req.body.data);
//   res.json({ message: 'hooray! welcome to our api!' }); 
// });
// app.use('/api', apirouter);





app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/uploadpic', (request, response) => response.render('pages/uploadpic'));
app.get('/admin101', (request, response) => response.render('pages/admin101'));
app.get('/profile', (request, response) => response.render('pages/profile'));
app.get('/paragraph', (request, response) => response.render('pages/paragraph'));
app.get('/baseline', (request, response) => response.render('pages/baseline'));
app.get('/prologue', (request, response) => response.render('pages/prologue'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
