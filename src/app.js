require('dotenv').config()
require('./strategies/discord');

const mongoose = require('mongoose');

(async () => {
    await mongoose.connect("mongodb://USS-Bot:USSb0t@host.techna.xyz:8144", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    console.log('Connected to MongoDB!')
    return mongoose;
})()

const express = require('express');
const passport = require('passport');
const app = express()
const PORT = process.env.PORT || 3002;
const routes = require('./routes');
const session = require('express-session');
const cors = require('cors');
const Store = require('connect-mongo');
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: [ 'http://ussapi.ga' ],
    credentials: true
}))

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongoUrl: 'mongodb://USS-Bot:USSb0t@host.techna.xyz:8144/' })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes );

app.listen(PORT, async () => {
    console.log(`Running on port ${PORT}`)
})