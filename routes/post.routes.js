const router = require("express").Router();
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

const postPermissions = {
    admin: ['create', 'read', 'update', 'delete'],
    moderator: ['read', 'update', 'delete'],
    user: ['create', 'read'],
};

const { createPost, deletePost } = require("../controllers/post.controller");
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
module.exports = router;