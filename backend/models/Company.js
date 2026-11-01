
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String],
    answer: String,
    explanation: String,
    code: String,
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    }
});

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    questions: [questionSchema]
});

const roundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    topics: [topicSchema]
});

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    rounds: [roundSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Company", companySchema);
