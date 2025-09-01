import { ProductRepository } from "../repository/repository.js";
import categoryList from "../helpers/helper.js"

export const getMenu = async (req, res) => {
    const products = await ProductRepository.getAll();
    const includingway = "menupartials/welcome";
    res.render("menu/menu", { products, categoryList, includingway });
};

export const getMenuByCategory = async (req, res) => {
    try {
        const category = categoryList[req.params.category];
        const products = await ProductRepository.getMenuByCategory(req.params.category);
        const includingway = "menupartials/menulist";
        res.render("menu/menu", { products, categoryList, categoryName: category, includingway }, (err, html) => {
            if (err) throw err;
            res.send(html);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};