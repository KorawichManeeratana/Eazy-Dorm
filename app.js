require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000

const connection= require('./dbconn.js');

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



app.get('/selectroom', function (req, res) {
        res.render('selectroom')
});
app.get('/roominfo', function (req, res) {
    res.render('roominfo')
});

app.use('/showproblem', require('./routes/showproblem'))


//routing
app.use('/api', require('./routes/api/registerroutes.js'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
