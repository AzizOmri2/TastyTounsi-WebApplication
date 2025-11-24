import express from "express";
import { loginAdmin, createAdmin, updateAdmin } from "../controllers/adminController.js";
import authMiddleware, { verifyAdmin } from "../middleware/auth.js"; // optional

const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", loginAdmin);
adminRouter.post("/create", authMiddleware, verifyAdmin, createAdmin);
adminRouter.put("/update/:id", updateAdmin);

export default adminRouter;
