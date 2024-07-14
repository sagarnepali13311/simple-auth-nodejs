import { Router } from "express";
import usersRoutes from "./users.route.js";
import authRoutes from "./auth.route.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export default router;
