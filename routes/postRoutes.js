const express = require("express");
const { createPost } = require("../services/PostService");
const router = express.Router();

// Route for creating a new post
router.post("/", async (req, res) => {
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
