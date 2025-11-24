import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Helper to create JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =================== LOGIN ADMIN ===================
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user || user.role !== "ADMIN") {
            return res.status(401).json({ success: false, message: "Unauthorized: The user trying to connect is not an admin." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Please check your email and password and try again." });

        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// =================== CREATE ADMIN ===================
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const normalizedEmail = email.toLowerCase();

        if (!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password too short" });
        }

        const exists = await userModel.findOne({ email: normalizedEmail });
        if (exists) return res.status(400).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new userModel({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: "ADMIN"
        });

        const admin = await newAdmin.save();
        const token = createToken(admin._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// =================== UPDATE ADMIN ===================
const updateAdmin = async (req, res) => {
    const adminId = req.params.id; // admin ID from URL
    const { name, email, password, passwordOld } = req.body;

    try {
        const admin = await userModel.findById(adminId);
        if (!admin || admin.role !== "ADMIN") {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Update name/email
        if (name) admin.name = name;
        if (email) admin.email = email.toLowerCase();

        // Update password only if passwordOld is correct
        if (password) {
            if (!passwordOld) {
                return res.status(400).json({ success: false, message: "Old password is required" });
            }

            const isMatch = await bcrypt.compare(passwordOld, admin.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Old password is incorrect" });
            }

            if (password.length < 8) {
                return res.status(400).json({ success: false, message: "New password too short" });
            }

            admin.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await admin.save();

        res.json({
            success: true,
            user: {
                id: updatedAdmin._id,
                name: updatedAdmin.name,
                email: updatedAdmin.email,
                role: updatedAdmin.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { loginAdmin, createAdmin, updateAdmin };
