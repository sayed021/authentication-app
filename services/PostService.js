const mongoose = require('mongoose');  // Use require instead of import

const Post = require('../models/post');
const User = require('../models/user');

async function createPost(postData, userId = "677fc2f68eb997f4952998c3") {
      const newPostData = {
        title: postData.title,
        content: postData.content,
        author:  new mongoose.Types.ObjectId(userId),  // Link the post to the logged-in user
        tags: postData.tags || [],
        category: postData.category || 'Other',
        published: postData.published || false,
        publishedAt: postData.publishedAt || null,
        slug: postData.slug,
        coverImage: postData.coverImage || null,
        likes: postData.likes || 0,
      };
      console.log("Post call successfully");
    try {
      const newPost = new Post(newPostData);
      const result = await newPost.save();
      console.log("Post created successfully");
      return result;
    } catch (error) {
      console.error("Error creating Post:", error);
      throw error;
    }
}
  

module.exports = { createPost };
