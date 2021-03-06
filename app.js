const express = require('express');
const morgan = require('morgan');
const app = express();

// =========  ROUTER =========

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

// ========= MiddleWare qurovulcha ======== //

app.use(express.json());

app.use((req, res, next) => {
  req.time = new Date();
  res.time = new Date();
  next();
});

app.use((req, res, next) => {
  if (req.path === '/api/v1/tours/best-3-tours') {
    req.query.sort = '-ratingsAverage';
    req.query.limit = 3;
  }
  next();
});

// Static File Middleware

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use(morgan('dev'));

module.exports = app;
