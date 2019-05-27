var Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

const url = process.env.MONGO_URL || "mongodb://mongo-0.mongo:27017/?replicaSet=rs0";
//const url = "mongodb://localhost:27017/";
// Database Name
const dbName = 'myproject';

EmployeeProvider = function (cb) {
    var that = this;
// Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        // assert.equal(null, err);
        console.log(err);
        console.log("Connected successfully to server");

        that.db = client.db(dbName);
        if (cb) cb();
        client.close();
    });
};

EmployeeProvider.prototype.getCollection = function (callback) {
    this.db.collection('employees', function (error, employee_collection) {
        if (error) callback(error);
        else callback(null, employee_collection);
    });
};

//find all employees
EmployeeProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error)
        else {
            employee_collection.find().toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};

//find an employee by ID
EmployeeProvider.prototype.findById = function (id, callback) {
    if(id.length !== 24){
      return callback(null);
    }
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error)
        else {
            employee_collection.findOne({_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function (error, result) {
                if (error) callback(error)
                else callback(null, result)
            });
        }
    });
};


//save new employee
EmployeeProvider.prototype.save = function (employees, callback) {
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error)
        else {
            if (typeof(employees.length) == "undefined")
                employees = [employees];

            for (var i = 0; i < employees.length; i++) {
                employee = employees[i];
                employee.created_at = new Date();
            }

            employee_collection.insert(employees, function () {
                callback(null, employees);
            });
        }
    });
};

// update an employee
EmployeeProvider.prototype.update = function (employeeId, employees, callback) {

    if(employeeId.length !== 24){
        return callback(null);
    }

    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.update(
                {_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
                employees,
                function (error, employees) {
                    if (error) callback(error);
                    else callback(null, employees)
                });
        }
    });
};

//delete employee
EmployeeProvider.prototype.delete = function (employeeId, callback) {
    if(employeeId.length !== 24){
        return callback(null);
    }
    this.getCollection(function (error, employee_collection) {
        if (error) callback(error);
        else {
            employee_collection.remove(
                {_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
                function (error, employee) {
                    if (error) callback(error);
                    else callback(null, employee)
                });
        }
    });
};

exports.EmployeeProvider = EmployeeProvider;