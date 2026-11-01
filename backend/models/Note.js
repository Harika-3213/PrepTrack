const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company: {
        type: String,
        default: "General"
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);