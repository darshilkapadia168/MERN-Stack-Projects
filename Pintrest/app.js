var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require("express-session");
const passport = require('passport');
const flash = require("connect-flash");
const User = require("./models/user"); 


var indexRouter = require('./routes/index');

var app = express();

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.use(flash());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hey hey hey"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(3000);

module.exports = app;
