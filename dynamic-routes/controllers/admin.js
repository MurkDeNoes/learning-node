const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.status(302).redirect('/');
    }

    Product.findById(req.params.productId, product => {
        if (!product) {
            return res.status(302).redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        null,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );

    product.save();

    res.status(302).redirect('/admin/products');
};

exports.postEditProduct = (req, res, next) => {
    const updatedProduct = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );

    updatedProduct.save();

    res.status(302).redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};
