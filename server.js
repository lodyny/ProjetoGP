/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var cb = null;
var app = express();
var ready = false;

app.configure(function () {
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {layout: false});
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

var employeeProvider = new EmployeeProvider(() => {
    ready = true;
    if (cb) cb(server)
});

//Routes

//kubernetes
//index
app.get('/healthz', function (req, res) {
    res.send('ok');
});


//index
app.get('/', function (req, res) {
    employeeProvider.findAll(function (error, emps) {
        res.render('index', {
            title: 'Employees',
            employees: emps
        });
    });
});


//new employee
app.get('/employee/new', function (req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
app.post('/employee/new', function (req, res) {
    employeeProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function (error, docs) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect('/')
        }
    });
});

//update an employee
app.get('/employee/:id/edit', function (req, res) {
    employeeProvider.findById(req.param('_id'), function (error, employee) {
        if(!employee){
            res.status(404);
            return res.send("404 employee not found");
        }
        res.render('employee_edit',
            {
                title: employee.title,
                employee: employee
            });
    });
});

//save updated employee
app.post('/employee/:id/edit', function (req, res) {
    employeeProvider.update(req.param('_id'), {
        title: req.param('title'),
        name: req.param('name')
    }, function (error, docs) {
        if(!docs){
            res.status(404);
            return res.send("404 employee not found");
        }
        res.redirect('/')
    });
});

//delete an employee
app.post('/employee/:id/delete', function (req, res) {
    employeeProvider.delete(req.param('_id'), function (error, docs) {
        if(!docs){
            res.status(404);
            return res.send("404 employee not found");
        }
        res.redirect('/')
    });
});


var server = app.listen(process.env.PORT || 8080);

module.exports = function (callback) {
    if (ready) callback(server);
    cb = callback;

};


