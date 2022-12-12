const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');
const errorMiddleware = require('./middlewares/error');
const airQualityController = require('./controllers/airquality');
const mostPollutedController = require('./controllers/mostpolluted');
const notFoundController = require('./controllers/notfound');

//Initialize app
const app = express();
app.use(cors());

//Handle auth
app.use(authMiddleware);

//Handle routes
app.get('/airquality', airQualityController);
app.get('/mostpolluted', mostPollutedController);

//Handle unknown requests
app.all('*', notFoundController);

//Handle errors
app.use(errorMiddleware);

module.exports = app;
