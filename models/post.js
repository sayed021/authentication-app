const mongoose = require("mongoose");

// User Schema Definition
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [150, "Title cannot exceed 150 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            enum: ["Tech", "Lifestyle", "Education", "Health", "Other", "Technology"],
            default: "Other",
        },
        published: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
            default: null,
        },
        slug: {
            type: String,
            unique: true,
            required: [true, "Slug is required"],
            trim: true,
        },
        coverImage: {
            type: String,
            default: null,
        },
        likes: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to set default slug if not provided
postSchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
    next();
});

// Virtual for Post URL (optional)
postSchema.virtual("url").get(function () {
    return `/posts/${this.slug}`;
});
// Create the Post Model
const Post = mongoose.model("post", postSchema);

module.exports = Post;
