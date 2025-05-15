const router = require("express").Router();
const auth = require("../middleware/auth");
const { createComment, deleteComment } = require("../controllers/comment.controller");
const rbac = require("../middleware/rbac");


const commentPermissions = {
    admin: ['create', 'read', 'update', 'delete'],
    moderator: ['read', 'update', 'delete'],
    user: ['create', 'read'],
};

router.post("/:postId", auth, createComment);
router.delete("/:id", auth, deleteComment);
module.exports = router;