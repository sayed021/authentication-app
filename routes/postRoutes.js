const express = require("express");
const { createPost, getPosts } = require("../services/PostService");
const { isAuthenticated } = require("../middleware/authentication");
const router = express.Router();

// Route for creating a new post
router.get("/get-all", async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(201).json({
            message: "post fetch successfully",
            post: posts,
        });
    } catch (error) {
        res.status(500).json({ error: "Error getting post", message: error.message });
    }
});

// Route for creating a new post
router.post("/create", isAuthenticated, async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await createPost(postData);
        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ error: "Error creating post", message: error.message });
    }
});


module.exports = router;
