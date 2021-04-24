const Comment = require('../models/comments.js');
const mongoose = require('mongoose');

module.exports = {

    getComments: async (req, res) => {

        try {
            const comments = await Comment.find();
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(200).json({ message: "No comments in this blogs" });
            }
        } catch (error) {
            res.status(409).json({ message: error });
        };

    },

    createComment: async (req, res) => {

        const comment = req.body
        comment.user_id = req.user.id
        const newComment = new Comment(comment)

        try {
            await newComment.save();
            res.status(201).json(newComment);

        } catch (error) {
            res.status(409).json({ message: error.message });

        };

    },

    updateComment: async (req, res) => {

        const { _id } = req.params;
        const comment = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'No post available' });
        }

        try {
            const existingComment = await Comment.findById(_id);

            if (existingComment.user_id == req.user.id) {
                const updateComment = await Comment.findByIdAndUpdate(_id, { ...comment, _id }, { new: true });
                return res.status(200).json({ updateComment });
            } else {
                return res.status(200).json({ message: "You are not author to update this comment" });
            }

        } catch (error) {
            res.status(409).json({ message: error.message });

        };
    },

    deleteComment: async (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: 'No post available' });
        }

        try {
            const existingComment = await Comment.findById(_id);

            if (existingComment.user_id == req.user.id) {
                const deleteComment = await Comment.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Post deleted succesfully' });
            } else {
                return res.status(200).json({ message: "You are not author to delete this comment" });
            }

        } catch (error) {
            res.status(409).json({ message: error.message });

        };
    }
}