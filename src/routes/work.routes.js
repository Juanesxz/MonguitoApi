import { Router } from "express";
import {
    getworks,
    createWork,
    getWork,
    updateWork,
    deleteWork,
} from "../controllers/work.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();


router.get("/works", authRequired, getworks);
router.get("/works/:id", authRequired, getWork);
router.post("/works", authRequired, createWork);
router.put("/works/:id", authRequired, updateWork);
router.delete("/works/:id", authRequired, deleteWork);

export default router;
