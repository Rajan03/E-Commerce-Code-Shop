import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

// Initialize App
const app = express();

// Body parser
app.use(express.json())

// Enviornment Config Variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Listen app
app.listen(PORT, () => console.log(`Server Up at ${PORT} in ${process.env.NODE_ENV}`))