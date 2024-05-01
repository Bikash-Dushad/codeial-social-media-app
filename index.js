const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const port = 8000;
require('./config/mongoose');
const expresssession = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const flash = require('connect-flash')
const custumMiddleware = require('./config/middleware')

app.use(express.urlencoded({extended: true}));
app.use(cookieparser())
app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use(express.static(__dirname + '/assets'));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(expresssession({
    secret: 'xyz', // Replace with a random string for session encryption
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash())
app.use(custumMiddleware.setFlash);

app.use('/', require('./routes'))

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})