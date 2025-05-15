const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get current logged-in user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update current user profile (name/email only)
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Change current user password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
            return res.status(400).json({ error: "Old and new password required" });

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Old password incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
