// Import svih neophodnih modula
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const corsOptions = require('./configuration/corsConfiguration');
const databaseOptions = require('./configuration/databaseConfiguration');
const passport = require('passport');


const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

/* 
    Inicijalizacija servera
*/
const port = 3000;
const server = express();
server.listen(port, () => {
    console.log(`Server osluskuje na portu ${port}`);
});

/*
    Registracija Body Parser i Cors Middleware-a
*/
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

/* 
    Povezivanje na MongoDB bazu podataka
*/
mongoose.connect(databaseOptions.path, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${databaseOptions.path}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

/*
    Registracija routing middleware-a za User i Event rute
*/
server.use('/users', usersRouter);
server.use('/events', eventsRouter);

/*
    Registracija Passport middleware-a
*/
server.use(passport.initialize());
server.use(passport.session());

require('./configuration/passportConfiguration')(passport);