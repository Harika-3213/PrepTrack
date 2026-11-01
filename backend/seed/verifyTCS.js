
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Company = require("../models/Company");

async function verifyTCS() {
    try {
        await connectDB();

        const company = await Company.findOne({ name: "TCS" });

        if (!company) {
            throw new Error("TCS company not found");
        }

        const round = company.rounds.find(
            item => item.name === "Round 1 - Foundation Assessment"
        );

        if (!round) {
            throw new Error("TCS Round 1 not found");
        }

        let total = 0;

        console.log("\nTCS ROUND 1 QUESTION REPORT\n");

        for (const topic of round.topics) {
            const count = topic.questions.length;
            total += count;

            console.log(`${topic.name}: ${count} questions`);
        }

        console.log("------------------------------");
        console.log(`TOTAL QUESTIONS: ${total}`);

        if (total === 75) {
            console.log("SUCCESS: All 75 questions are available!");
        } else {
            console.log("WARNING: Expected 75 questions.");
        }

    } catch (error) {
        console.error("Verification error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

verifyTCS();
