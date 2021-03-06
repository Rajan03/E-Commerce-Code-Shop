import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all Products
// @route GET  /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// @desc Fetch Single Product
// @route GET  /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product)
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product Not Found!!");
    }
});

// @desc Delete a product
// @route GET  /api/products/:id
// @access Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product)
    if (product) {
        await product.remove();
        res.json({message: "Product Removed!!"});
    } else {
        res.status(404);
        throw new Error("Product Not Found!!");
    }
});

// @desc Create a product
// @route POST  /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "https://via.placeholder.com/150",
        brand: "Sample Brand",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description",
        rating: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, brand, image, category, countInStock} =
        req.body;

    const product = await Product.findById(req.params.id);
    console.log(image)
    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product Not Found!!");
    }
});

// @desc Review a product
// @route POST /api/products/:id/reviews
// @access Private
const reviewProduct = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReview = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReview) {
            res.status(400);
            throw new Error("Product Already Reviewed!!")
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
        res.status(201).send({message: "Review Added successfully!!"});
    } else {
        res.status(404);
        throw new Error("Product Not Found!!");
    }
});
export {getProducts, getProductById, deleteProductById, createProduct, updateProduct, reviewProduct};
