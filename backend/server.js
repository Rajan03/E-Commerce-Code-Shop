import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import {notFound, errorHandler} from "./middlewares/errorHandler.js";
import path from "path";

// Initialize App
const app = express();

// Body parser
app.use(express.json())

// Environment Config Variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


// __dirname is only available with commonJS syntax but is not accessible in ES6 Modules.
const __dirname = path.resolve();
app.use(`/uploads`, express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}


// Middlewares
app.use(notFound);
app.use(errorHandler);

// Listen app
app.listen(PORT, () => console.log(`Server Up at ${PORT} in ${process.env.NODE_ENV}`))