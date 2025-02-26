require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000

const connection= require('./dbconn.js');
const cookieParser = require("cookie-parser");
app.use(cookieParser())


app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));


// Template
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/main'));

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

app.use('/owneddorm', require('./routes/owneddorm'));
app.use('/adddorm', require('./routes/adddorm'));
app.use('/addroom', require('./routes/addroom'));
app.use('/notification', require('./routes/notification'));

app.use('/selectroom', require('./routes/selectroom'));
app.use('/roominfo', require('./routes/roominfo'));

app.use('/editdorm', require('./routes/editdorm'));
app.use('/showproblem', require('./routes/showproblem'));

app.use('/profile', require('./routes/profile'));

//routing api
app.use('/api', require('./routes/api/account_relate/registerroutes.js'));

app.use('/api', require('./routes/api/account_relate/loginroutes.js'));

app.use('/api', require('./routes/api/cookies/decodeCookieroutes.js'));

app.use('/api', require('./routes/api/notfications/noriroutes.js'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
