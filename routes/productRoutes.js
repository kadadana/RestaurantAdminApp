import express from "express";
import { requireAuth } from "../auth.js";
import {
    getAllProducts,
    getAddPage,
    getEditPage,
    addProduct,
    delPic,
    editProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../helpers/upload.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllProducts);
router.get("/add", getAddPage);
router.get("/edit/:id", getEditPage);
router.post("/add", upload.single("image"), addProduct);
router.post("/delPic", delPic);
router.post("/edit", upload.single("image"), editProduct);
router.post("/delete", deleteProduct);

export default router;