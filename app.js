require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000


app.use(express.static('public'));

// Template
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/main'));

app.use('/login', require('./routes/login'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
