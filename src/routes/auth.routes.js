import { Router } from "express";
import { login, logout, profile, profiles, register, update } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()


router.post("/register", register)
router.post("/login", login)
router.put("/update/:_id", authRequired, update)
router.post("/logout", logout)
router.get("/profile", authRequired, profile)
router.get("/profiles", authRequired, profiles)


export default router