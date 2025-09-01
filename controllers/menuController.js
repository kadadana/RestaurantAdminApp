import { ProductRepository } from "../repository/repository.js";
import Product from "../models/Product.js";
import categoryList from "../helpers/helper.js"

export const getMenu = async (req, res) => {
    const products = await ProductRepository.getAll();
    res.render("menu/menu", {products, categoryList});
};