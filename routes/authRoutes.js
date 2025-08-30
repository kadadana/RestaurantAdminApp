import { Router } from "express";
import { getLoginPage, postLogin, postLogout } from "../controllers/authController.js";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.post("/logout", postLogout);

export default router;