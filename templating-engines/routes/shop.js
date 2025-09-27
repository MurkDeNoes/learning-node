const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(adminData.products);
    res.render('shop', {products: adminData.products, docTitle: 'Shop'});
})

module.exports = router;