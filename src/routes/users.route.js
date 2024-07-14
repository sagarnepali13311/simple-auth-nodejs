import { Router } from "express";
import UserController from "../controllers/users.controller.js";

const router = Router();

router.get("/", UserController.findAll);
router.get("/id/:id", UserController.findById);
router.get("/email/:email", UserController.findByEmail);
router.post("/", UserController.create);
router.put("/", UserController.update);
router.delete("/:id", UserController.remove);

export default router;
