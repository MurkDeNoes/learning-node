const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.get('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product </button></form>');
})

app.post('/product', (req, res) => {
    console.log(req.body.title)
    res.redirect('/');
})

app.use('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(3000);