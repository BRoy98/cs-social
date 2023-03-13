import express from "express";
import authRoutes from "./auth.router";

const router = express.Router();

router.get("/", (req, res) => res.send(`<pre>Cutshort API 🔥🚀</pre>`));
router.use("/auth", authRoutes);

export default router;
