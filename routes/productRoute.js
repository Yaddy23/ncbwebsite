import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMidleware.js";
import formidable from 'express-formidable'
import { 
    createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productPhotoController, 
    updateProductController 
} from "../controllers/productController.js";

const router = express.Router();

//add
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

//update
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
)

//get all products
router.get("/get-product", getProductController)

//single product
router.get("/get-product/:slug", getSingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController)

//delete
router.delete("/product/:pid", deleteProductController)

export default router;