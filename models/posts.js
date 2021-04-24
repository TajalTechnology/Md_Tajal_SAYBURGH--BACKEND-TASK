const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new mongoose.Schema({

    title: { type: String, required: true, trim: true, },
    description: { type: String, required: true, trim: true, },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    //store basc64 string which comes from front-end
    selectedFile: { type: String, },
    likeCount: { type: Number, default: 0, },

},
    { timestamps: true }

);

module.exports = mongoose.model('Posts', postsSchema);