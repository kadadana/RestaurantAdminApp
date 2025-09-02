import express from "express";
import { requireAuth } from "../auth.js";
import {
    getAllProducts,
    getFilteredProducts,
    getAddPage,
    getEditPage,
    addProduct,
    delPic,
    editProduct,
    deleteProduct,
    generateQr,
} from "../controllers/adminController.js";
import { upload } from "../helpers/upload.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllProducts);
router.get("/dashboard", getAllProducts);
router.get("/search", getFilteredProducts);
router.get("/add", getAddPage);
router.get("/edit/:id", getEditPage);
router.post("/add", upload.single("image"), addProduct);
router.post("/delPic", delPic);
router.post("/edit", upload.single("image"), editProduct);
router.post("/delete", deleteProduct);
router.get("/makeqr", generateQr);


export default router;