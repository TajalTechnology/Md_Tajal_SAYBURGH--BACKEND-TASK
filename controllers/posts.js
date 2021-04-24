const Posts = require('../models/posts.js');
const mongoose = require('mongoose');

module.exports = {

    getPosts: async (req, res) => {

        try {
            const posts = await Posts.find();
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(200).json({ message: "No post in this blogs" });
            }

        } catch (error) {
            res.status(409).json({ message: error });
        };

    },

    createPost: async (req, res) => {

        const post = req.body
        const newPost = new Posts(post)

        try {
            await newPost.save();
            res.status(201).json(newPost);

        } catch (error) {
            res.status(409).json({ message: error.message });

        };

    },

    updatePost: async (req, res) => {
        const { _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'No post available' });
        }

        try {
            const existingPost = await Posts.findById(_id);
            if (existingPost.user_id == req.user.id) {
                console.log('hit');
                const updatePost = await Posts.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
                return res.status(200).json({ updatePost });
            } else {
                return res.status(200).json({ message: "You are not author to update this post" });
            }
        } catch (error) {
            res.status(409).json({ message: error });
        };
    },

    deletePost: async (req, res) => {

        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'No post available' });
        }
        try {
            const existingPost = await Posts.findById(_id);
            if (existingPost.user_id == req.user.id) {
                const deletePost = await Posts.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Post deleted succesfully' });
            } else {
                return res.status(200).json({ message: "You are not author to delete this post" });
            }

        } catch (error) {
            res.status(409).json({ message: error.message });

        };
    },

    likePost: async (req, res) => {

        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'No post available' });
        }
        try {
            const post = await Posts.findById(_id)

            const updatePost = await Posts.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
            return res.status(200).json({ updatePost });
        } catch (error) {
            res.status(409).json({ message: error });
        };
    }
}