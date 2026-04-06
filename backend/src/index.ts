import "dotenv/config";
import express from "express";

import { config } from "@/config";
import authRoutes from "@/routes/auth.routes";

/* ========================= Initialize Express App ========================= */
const app = express();

/* =============================== Middleware =============================== */
app.use(express.json());

/* ================================ Routes ================================= */
app.use("/api/v1", authRoutes);

/* ================================ Server ================================= */
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`==========================================`);
});
