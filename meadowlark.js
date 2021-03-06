// jshint esversion: 6

// Dependencies required for the app
const express = require('express');
const app = express();
const fortune = require('./lib/fortune.js');

// Use port 3000 unless there exists a preconfigured port
app.set('port', process.env.PORT || 3000);

// Static resources middleware
app.use(express.static(__dirname + '/public'));

// Set up handlebars view engine
var handlebars = require('express3-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Middleware to detect test=1 in the querystring
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
// Home Page
app.get('/', function(req, res) {
    res.render('home');
});

// About Page
app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: './qa/tests-about.js',
        pageTitle: 'About'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ': ' + req.headers[name] + '\n';
    }
    res.send(s);
});

app.disable('x-powered-by');

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express is running at http://localhost:' + app.get('port') + '...');
});