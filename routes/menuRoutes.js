import { Router } from "express";
import {
    getMenu,
    getMenuByCategory,
} from "../controllers/menuController.js";


const router = Router();

router.get("/menu", getMenu);
router.get("/menu/:category", getMenuByCategory);

export default router;