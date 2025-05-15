const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helloRoutes = require("./routes/hello.route");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(express.json());


app.use("/api", helloRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 5000, () => console.log("Server running"));
    })
    .catch(err => console.error(err));