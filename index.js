const express = require('express');
const app = express();
const axios = require('axios').default;
const ejs = require('ejs')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// PORT
const PORT = process.env.PORT || 3000;

// Middleware (Body Parser &  Method Override)

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// Mongoose
main().catch(e => console.log(e))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/recordStore');
    console.log('Connected to MongoDB')
}

// Importing Products model from products.js
const Product = require('./models/products')

// Routes

// Index
app.get('/products', async (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const products = await Product.find({ genre })
        res.render('index', { products, genre })
    } else {
        // Query for all documents in my database
        const products = await Product.find({});
        res.render('index', { products, genre: 'All' })
    }
})
// Serving the form to add a new product to the store
app.get('/products/new', (req, res) => {
    res.render('new')
})

// Handle post request to /products
app.post('/products', async (req, res) => {
    const userProduct = req.body;
    const newProduct = new Product(userProduct);
    newProduct.save()
        .then(res => console.log(res))
        .catch(e => console.log(e))
    res.redirect('/products')
})

// Show
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id)
    res.render('show', { foundProduct })
})



// Serve form to edit
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('edit', { foundProduct })
})

// Update the product and patch it
app.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${foundProduct._id}`)
})

// Delete a specific product off of the server
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})
// Listen to Port
app.listen(PORT, function () {
    console.log(`LISTENING ON PORT ${PORT}`)
})