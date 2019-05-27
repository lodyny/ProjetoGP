var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var startServer = require('../server');
var expect = require("chai").expect;
var should = chai.should();

describe('/POST /employee/new', () => {
    it('it should POST a new employee', (done) => {
        startServer((server) => {

            var employee = {
                title: "Developer",
                name: "John Doe"
            }
            chai.request(server)
                .post('/employee/new')
                .send(employee)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe('/GET /employee/:id/edit?_id=a', () => {
    it('\'it should say the employee does not exist\'', (done) => {
        startServer((server) => {

            chai.request(server)
                .get('/employee/:id/edit?_id=a')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

describe('/POST /employee/:id/delete?_id=a', () => {
    it('it should say the employee does not exist', (done) => {
        startServer((server) => {

            chai.request(server)
                .post('/employee/:id/delete?_id=a')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
describe('/POST /employee/:id/update?_id=a', () => {
    it('it should say the employee does not exist', (done) => {
        startServer((server) => {

            chai.request(server)
                .post('/employee/:id/update?_id=a')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});


describe('/POST /dsadkljasdklas', () => {
    it('it should say the route does not exist', (done) => {
        startServer((server) => {

            chai.request(server)
                .post('/dsadkljasdklas')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
