/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , favicon = require('serve-favicon')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var cb = null;
var app = express();
var ready = false;

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'development') {
    app.use(express.errorHandler());
}

var employeeProvider = new EmployeeProvider(() => {
    ready = true;
    if (cb) cb(server)
});

//Routes
var router = express.Router();

//kubernetes
//index
router.get('/healthz', function (req, res) {
    res.send('ok');
});


//index
router.get('/', function (req, res) {
    employeeProvider.findAll(function (error, emps) {
        res.render('index', {
            title: 'Employees',
            employees: emps
        });
    });
});


//new employee
router.get('/employee/new', function (req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
router.post('/employee/new', function (req, res) {
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
router.get('/employee/:id/edit', function (req, res) {
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
router.post('/employee/:id/edit', function (req, res) {
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
router.post('/employee/:id/delete', function (req, res) {
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


