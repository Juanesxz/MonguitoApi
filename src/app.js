import express from "express";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import workRoutes from "./routes/work.routes.js"

const app = express();
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", workRoutes)
export default app;