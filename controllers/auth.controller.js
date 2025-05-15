const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { issueToken } = require("../utils/jwt");

/**
 * Register a new user
 * Expects: { name, email, password, role? }
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        // Issue JWT token
        const token = issueToken(user);

        res.status(201).json({ token });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Server error during registration" });
    }
};

/**
 * Login existing user
 * Expects: { email, password }
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Issue JWT token
        const token = issueToken(user);

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
};
