import express from "express";
import colors from "colors";
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDb from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'
//configure env
dotenv.config()

//db config
connectDb();

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
    res.send({
        message:'Hello World'
    })
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on PORT: ${PORT}`.bgCyan.white);
});