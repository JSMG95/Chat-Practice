const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    initials: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
