import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMidleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

router.put(
    '/update-category/:id', 
    requireSignIn, 
    isAdmin, 
    updateCategoryController
);

//get all
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController)

router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
)

export default router;