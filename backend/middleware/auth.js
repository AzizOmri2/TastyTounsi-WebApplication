import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Generic auth middleware (for all logged-in users)
const authMiddleware = async (req, res, next) => {
    const token = req.headers.token; // your current approach

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized - Login again"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user; // attach full user object to request
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;


// Admin-only middleware
export const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ success: false, message: "Forbidden - Admins only" });
    }

    next();
};