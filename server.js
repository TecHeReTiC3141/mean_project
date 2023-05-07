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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);
app.use(cors());

// add data
app.post('/insert', (req, res) => {
    const {name} = req.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewRow(name);
    console.log(result);

    result
        .then(data => {
            console.log(data);
            res.json({ data })
        })
        .catch(err => console.log(err))
});

// read data
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAll();
    result
        .then(data => res.json({data}))
        .catch(err => console.log(err));

});

// delete data
app.delete('/delete/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    const db = dbService.getDbServiceInstance();

    const result = db.deleteRow(id);

    result
        .then(data => res.json( { success: data })) // data - thing which is returned by promise;
        .catch(err => console.log(err.message));
});

app.patch('/update', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const { id, newVal } = req.body;

    const result = db.updateNameById(id, newVal);

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err.message));
});

app.get('/search/:pattern', (req, res) => {
    const { pattern } = req.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByPattern(pattern);

    result
        .then( data => res.json({ data }))
        .catch(err => console.log(err.message));

})


app.listen(process.env.PORT || 3000,
    () => console.log('On http://localhost:3000'));
