
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        enum: ["TCS", "Infosys", "Cognizant", "Accenture", "HCLTech"]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        default: "General"
    },
    category: {
        type: String,
        enum: [
            "Coding",
            "Aptitude",
            "Logical Reasoning",
            "Verbal",
            "Technical",
            "HR"
        ],
        default: "Coding"
    },
    round: {
        type: String,
        default: "Practice"
    },
    priority: {
        type: String,
        enum: ["High", "Medium"],
        default: "Medium"
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },
    answer: {
        type: String,
        default: ""
    },
    explanation: {
        type: String,
        default: ""
    },
    solution: {
        type: String,
        default: ""
    },
    sampleInput: {
        type: String,
        default: ""
    },
    sampleOutput: {
        type: String,
        default: ""
    },
    year: {
        type: Number,
        default: null
    },
    sourceUrl: {
        type: String,
        default: ""
    },
    verificationStatus: {
        type: String,
        enum: ["verified", "reported", "practice"],
        default: "practice"
    }
}, { timestamps: true });

questionSchema.index({
    company: 1,
    category: 1,
    priority: 1
});

module.exports = mongoose.model("Question", questionSchema);
