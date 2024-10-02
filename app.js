const express = require("express");
const cors = require('cors');
const ApplicationRoutes = require('./routes/index.routes');
require("dotenv").config();

// express app
const app = express();
app.use(express.json());

// global rate limiter 
const rateLimiter = require('./middlewares/rateLimit');
app.use(rateLimiter);

// cors options 
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// payload size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// using params request  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server routes
app.use(cors(corsOptions));
ApplicationRoutes(app);

// error handler
const ErrorHandling = require("./middlewares/globalErrorHandling");
app.use(express.static("public"));
app.use(ErrorHandling.globalErrorHandling);
app.use(ErrorHandling.notFound);

// database connection
const { databaseConnection } = require('./config/database');
databaseConnection();

// server listening
app.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and running on port ${process.env.PORT}!`)
});

module.exports = app;

