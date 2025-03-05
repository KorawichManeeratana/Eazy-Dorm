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
app.use('/addpayment', require('./routes/addpayment'));
app.use('/owneddorm', require('./routes/owneddorm'));
app.use('/adddorm', require('./routes/adddorm'));
app.use('/addroom', require('./routes/addroom'));
app.use('/notification', require('./routes/notification'));

app.use('/selectdorm', require('./routes/selectdorm'));
app.use('/selectroom', require('./routes/selectroom'));
app.use('/roominfo', require('./routes/roominfo'));
app.use('/dorminfo', require('./routes/dorminfo'));

app.use('/editdorm', require('./routes/editdorm'));

app.use('/profile', require('./routes/profile'));
app.use('/bill', require('./routes/bill'));
app.use('/qrbill', require('./routes/qrbill'));
app.use('/allBill', require('./routes/allBill'));
app.use('/viewBill', require('./routes/viewBill.js'))
app.use('/userselect', require('./routes/userselect'));
app.use('/reportform', require('./routes/reportform'));
app.use('/editroom', require('./routes/editroom'));
app.use('/owndorminfo', require('./routes/owndorminfo'));
app.use('/reportnoti', require('./routes/reportnoti'));
app.use('/paysuccess', require('./routes/paysuccess'));

//routing api
app.use('/api', require('./routes/api/account_relate/registerroutes.js'));

app.use('/api', require('./routes/api/account_relate/loginroutes.js'));

app.use('/api', require('./routes/api/cookies/decodeCookieroutes.js'));
app.use('/api', require('./routes/api/cookies/clearCookies.js'))

app.use('/api', require('./routes/api/notfications/noriroutes.js'));

app.use('/api', require('./routes/api/dorm/dormRoute.js'));

app.use('/api', require('./routes/api/room/roomRoute.js'));

app.use('/api', require('./routes/api/notfications/updatestatus.js'));

app.use('/api', require('./routes/api/payment/sendbill.js'));

app.use('/api', require('./routes/api/payment/confirmpayment.js'));

app.use('/api', require('./routes/api/comment/addComment.js'))



process.on('alert', (message) => {
    console.log('Received alert:', message);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
