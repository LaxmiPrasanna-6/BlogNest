const mongoose = require('mongoose');

// Define User/Author Schema
const UserAuthorSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ["user", "author", "admin"], // Allowed roles
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImageUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { strict: "throw" });

// Create model and export
const UserAuthorModel = mongoose.model('UserAuthor', UserAuthorSchema);
module.exports = UserAuthorModel;
