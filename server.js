if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout'); // for header and footer templates
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000,
    () => console.log('On http://localhost:3000'));
