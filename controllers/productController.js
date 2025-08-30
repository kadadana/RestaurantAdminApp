import { ProductRepository } from "../repository/repository.js";
import { formatPrice } from "../helpers/helper.js";
import Product from "../models/Product.js";
import fs from "fs";

export const getAllProducts = async (req, res) => {
    const products = await ProductRepository.getAll();
    const isAll = true;
    res.render("index", { products, isAll });
};

export const getActiveProducts = async (req, res) => {
    const products = await ProductRepository.getActives();
    const isAll = false;
    res.render("index", { products, isAll });
};

export const getAddPage = async (req, res) => {
    const id = await ProductRepository.findLatestId();
    res.render("add", {id});
};

export const getEditPage = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductRepository.getById(productId);

    var fileExists;

    if (fs.existsSync("public/" + product.path)) {
        fileExists = true;
    }

    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.render("edit", { product, fileExists });
};

export const addProduct = async (req, res) => {
    try {
        console.log(req.body);

        const { name, category, description, price } = req.body;
        const isActive = req.body.isActive ? true : false;

        const formattedPrice = formatPrice(price);

        const id = await ProductRepository.findLatestId();

        const imgPath = "pics/" + id + ".jpeg";

        const product = new Product(
            id,
            name,
            category,
            description,
            formattedPrice,
            isActive,
            imgPath
        );

        await ProductRepository.add(product);

        res.redirect("/");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const delPic = async (req, res) => {
    try {
        const { id } = req.body;

        const imgPath = "pics/" + id + ".jpeg";

        const publicImgPath = "public/pics/" + id + ".jpeg";

        fs.rm(publicImgPath, { recursive: true }, (err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("File deleted successfully");
        });
        await ProductRepository.delPic(id, imgPath);
        res.redirect("/edit/"+ id);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { id, name, category, description } = req.body;
        let price = req.body.price;
        const isActive = req.body.isActive ? true : false;

        const formattedPrice = formatPrice(price);

        const imgPath = "pics/" + id + ".jpeg";

        const product = new Product(
            id,
            name,
            category,
            description,
            formattedPrice,
            isActive,
            imgPath
        );
        await ProductRepository.update(id, product);

        res.redirect("/");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        await ProductRepository.delete(id);

        const publicImgPath = "public/pics/" + id + ".jpeg";

        if (fs.existsSync(publicImgPath)) {
            fs.rm(publicImgPath, { recursive: true }, (err) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log("File deleted successfully");
            });
        };

        res.redirect("/allproducts");


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}