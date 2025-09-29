const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = +id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProduct = products.findIndex(product => product.id === this.id);
                const updatedProducts = [ ...products ];

                updatedProducts[existingProduct] = this;

                fs.writeFile(p, JSON.stringify(updatedProducts), error => {
                    console.log(error);
                });
            } else {
                this.id = Math.random() * 100;
                
                products.push(this);

                fs.writeFile(p, JSON.stringify(products), error => {
                    console.log(error);
                });
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(item => item.id.toString() === id);
            callback(product)
        });
    }
};
