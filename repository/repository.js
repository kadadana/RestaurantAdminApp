import { delPic, getFilteredProducts } from "../controllers/productController.js";
import { getDB } from "../db.js";
import Product from "../models/Product.js";

export const ProductRepository = {

    async findLatestId() {
        const db = getDB();
        const lastProduct = await db
            .collection("products")
            .find({})
            .sort({ id: -1 })
            .limit(1)
            .toArray();

        const nextIdNum = lastProduct.length > 0 ? parseInt(lastProduct[0].id) + 1 : 1;
        const nextId = String(nextIdNum).padStart(5, "0");
        return nextId;
    },
    async getAll() {
        const db = getDB();
        const results = await db.
            collection("products")
            .find({})
            .toArray();
        return this.getProductList(results);
    },

    async getMenuByCategory(category) {
        const db = getDB();
        const results = await db.
            collection("products")
            .find({$and: [{ category: category }, { isActive: true }]})
            .toArray();
        return this.getProductList(results);
    },

    async getFilteredProducts(filterKey, filterValue) {
        const db = getDB();
        let query = {};

        if (filterKey === "isActive") {
            filterValue = filterValue === "true";
            query[filterKey] = filterValue;
        } else {
            query[filterKey] = { $regex: filterValue, $options: "i" };
        }

        const results = await db
            .collection("products")
            .find(query)
            .toArray();

        return this.getProductList(results);
    },
    async getActives() {
        const db = getDB();
        const results = await db
            .collection("products")
            .find({ "isActive": true })
            .toArray();
        return this.getProductList(results);
    },
    async getById(id) {
        const db = getDB();
        const product = await db
            .collection("products")
            .findOne({ id: id });
        const productObj = new Product(
            product.id,
            product.name,
            product.category,
            product.description,
            product.price,
            product.isActive,
            product.path
        );
        return productObj;
    },

    async add(product) {
        const db = getDB();
        const result = await db
            .collection("products")
            .insertOne(product);
    },

    async update(id, updatedProduct) {
        console.log(updatedProduct);
        const db = getDB();
        await db
            .collection("products")
            .updateOne(
                { id: id },
                { $set: updatedProduct }
            );
    },

    async delete(id) {
        const db = getDB();
        await db
            .collection("products")
            .deleteOne({ id: id });
    },
    async delPic(id, imgPath) {

        const db = getDB();
        await db
            .collection("products")
            .updateOne(
                { id: id },
                { $set: { path: imgPath } }
            );
    },

    getProductList(dbResult) {
        const products = [];

        dbResult.forEach(p => {
            const product = new Product(
                p.id,
                p.name,
                p.category,
                p.description,
                p.price,
                p.isActive,
                p.path
            );
            products.push(product);
        });
        return products;
    },

}
