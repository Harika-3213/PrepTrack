const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    completedQuestions: {
        type: [String],
        default: []
    },
    resetOtpHash: {
        type: String,
        select: false
    },
    resetOtpExpires: {
        type: Date,
        select: false
    },
    resetOtpAttempts: {
        type: Number,
        default: 0,
        select: false
    },
    resetOtpRequestedAt: {
        type: Date,
        select: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
