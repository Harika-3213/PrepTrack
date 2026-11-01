require("dotenv").config();

const mongoose = require("mongoose");
const Question = require("./models/Question");

const questions = [
    // TCS
    {
        company: "TCS",
        title: "Two Sum",
        topic: "Arrays",
        difficulty: "Easy"
    },
    {
        company: "TCS",
        title: "Reverse a String",
        topic: "Strings",
        difficulty: "Easy"
    },
    {
        company: "TCS",
        title: "Find Second Largest Element",
        topic: "Arrays",
        difficulty: "Easy"
    },

    // Infosys
    {
        company: "Infosys",
        title: "Valid Parentheses",
        topic: "Stack",
        difficulty: "Medium"
    },
    {
        company: "Infosys",
        title: "Binary Search",
        topic: "Searching",
        difficulty: "Easy"
    },
    {
        company: "Infosys",
        title: "Longest Substring Without Repeating Characters",
        topic: "Strings",
        difficulty: "Medium"
    },

    // Cognizant
    {
        company: "Cognizant",
        title: "Check Anagram Strings",
        topic: "Strings",
        difficulty: "Easy"
    },
    {
        company: "Cognizant",
        title: "Maximum Subarray Sum",
        topic: "Arrays",
        difficulty: "Medium"
    },
    {
        company: "Cognizant",
        title: "Merge Two Sorted Arrays",
        topic: "Arrays",
        difficulty: "Medium"
    },

    // Accenture
    {
        company: "Accenture",
        title: "Move Zeros to End",
        topic: "Arrays",
        difficulty: "Easy"
    },
    {
        company: "Accenture",
        title: "First Non-Repeating Character",
        topic: "Strings",
        difficulty: "Easy"
    },
    {
        company: "Accenture",
        title: "Climbing Stairs",
        topic: "Dynamic Programming",
        difficulty: "Easy"
    },

    // HCLTech
    {
        company: "HCLTech",
        title: "Prime Number Check",
        topic: "Numbers",
        difficulty: "Easy"
    },
    {
        company: "HCLTech",
        title: "Missing Number in Array",
        topic: "Arrays",
        difficulty: "Easy"
    },
    {
        company: "HCLTech",
        title: "Palindrome Number",
        topic: "Numbers",
        difficulty: "Easy"
    }
];

const seedQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Question.deleteMany({
            verificationStatus: "practice"
        });

        const formattedQuestions = questions.map(question => ({
            ...question,
            category: "Coding",
            verificationStatus: "practice",
            explanation: "Practice question for placement preparation. This is not verified as a historical company interview question."
        }));

        await Question.insertMany(formattedQuestions);

        console.log("Question bank added successfully!");
        console.log(`${formattedQuestions.length} practice questions inserted.`);

    } catch (error) {
        console.error("Seeding error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

seedQuestions();