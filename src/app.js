import express from "express";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import workRoutes from "./routes/work.routes.js"
import conceptsRoutes from "./routes/concepts.routes.js"

const app = express();
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", workRoutes)
app.use("/api", conceptsRoutes)
export default app;