if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const dbService = require('./dbService');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout'); // for header and footer templates

app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use(cors());

// add data
app.post('/insert', (req, res) => {

});

// read data
app.get('/getAll', (req, res) => {
    res.json({
        success: true,
    })
});

// delete data
app.delete('/delete', (req, res) => {

});

app.listen(process.env.PORT || 3000,
    () => console.log('On http://localhost:3000'));
