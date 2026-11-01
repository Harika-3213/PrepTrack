const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Quantitative", "Logical Reasoning", "Verbal"],
        required: true
    },
    attempted: {
        type: Number,
        default: 0,
        min: 0
    },
    correct: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

aptitudeSchema.index({ user: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model("Aptitude", aptitudeSchema);