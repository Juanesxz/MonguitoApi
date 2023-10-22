import { Router } from "express";
import { getconcepts, createconcepts, updateconcepts } from "../controllers/concepts.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();


router.get("/concepts", authRequired, getconcepts)
router.post("/concepts", authRequired, createconcepts)
router.put("/concepts/:id", authRequired, updateconcepts)


export default router