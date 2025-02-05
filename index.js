// Import dependencies
const mongoose=require ('mongoose');
const express = require('express');
const product = require('./models/product.model.js');
const app = express();
app.use(express.json());


// POST a new product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = await product.create(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json(products); // ✅ Fixed: Changed 500 to 200
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => { // ✅ Fixed: Proper function block
    try {
        const { id } = req.params;
        const foundProduct = await product.findById(id); // ✅ Fixed: Use lowercase `product`
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(foundProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH to update a product partially
app.patch('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productToUpdate = await product.findByIdAndUpdate(id, req.body, { new: true });

        if (!productToUpdate) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(productToUpdate);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



mongoose.connect("mongodb+srv://ajaykattimani:Ajay2801@backend.hr0ic.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Backend")
    .then(()=>{
    console.log('connected to database!');
app.listen(3000, ()=>{
console.log('server is running on port 3000');
});
}).catch(()=>{
    console.log('connection failed!');
});