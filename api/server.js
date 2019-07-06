require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const mongoose = require('mongoose');

const populateDB = require('_helpers/populatedb');

mongoose.connect('mongodb+srv://dbUser:dbPW@oauth-test-paolr.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

populateDB.populate();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.disable('etag');

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/animals', require('./animals/animals.controller'));
app.use('/chats', require('./chats/chats.controller'));
app.use('/streams', require('./streams/streams.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});