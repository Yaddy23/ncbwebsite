import productModel from "../models/productModel.js";
import fs from "fs"
import slugify from "slugify";

//add product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;

        const { photo } = req.files;

        switch(true){
            case !name:
                return res.status(500).send({ error: "Product Name is Required" });
            case !description:
                return res.status(500).send({ error: "Product Description is Required" });
            case !price:
                return res.status(500).send({ error: "Product Price is Required" });
            case !category:
                return res.status(500).send({ error: "Product Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Product Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Product Photo is Required and should be less than 1mb" })
        }

        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Added Successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while creating Product"
        })
    }
}

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 })
        res.status(200).send({
            succes: true,
            countTotal: products.length,
            message: "All Products Fetched",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching All Products",
            error: error.message,
        })
    }
}

//get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

  //get photo only 
  export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
  };

//delete 
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Deleting Product",
            error,
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        switch(true){
            case !name:
                return res.status(500).send({ error: "Product Name is Required" });
            case !description:
                return res.status(500).send({ error: "Product Description is Required" });
            case !price:
                return res.status(500).send({ error: "Product Price is Required" });
            case !category:
                return res.status(500).send({ error: "Product Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Product Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Product Photo is Required and should be less than 1mb" })
        }

        const products = await productModel.findByIdAndUpdate( req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })

        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Failed to Update Product"
        })
    }
}