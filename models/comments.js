const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({

    comment: { type: String, required: true, trim: true, },
    post_id: { type: Schema.Types.ObjectId, required: true, ref: 'Posts' },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

},
    { timestamps: true }

);

module.exports = mongoose.model('Comment', commentsSchema);