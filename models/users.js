const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 45, },
    email: { type: String, required: true, },
    password: { type: String, minlength: 8, },
    phone: { type: String, required: true, },
    address: { type: String, required: true, trim: true, minlength: 3, maxlength: 45, }

},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)