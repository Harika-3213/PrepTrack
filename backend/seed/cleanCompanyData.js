require("dotenv").config();

const connectDB = require("../config/db");
const Company = require("../models/Company");

async function cleanCompanyData() {
    try {
        await connectDB();

        const companies = await Company.find();

        for (const company of companies) {
            let removedTopics = 0;
            let removedRounds = 0;

            // Remove only topics that contain zero questions
            for (const round of company.rounds) {
                const originalCount = round.topics.length;

                round.topics = round.topics.filter(
                    topic => topic.questions && topic.questions.length > 0
                );

                removedTopics += originalCount - round.topics.length;
            }

            // Remove rounds that have no topics left
            const originalRoundCount = company.rounds.length;

            company.rounds = company.rounds.filter(
                round => round.topics.length > 0
            );

            removedRounds = originalRoundCount - company.rounds.length;

            await company.save();

            console.log(`\n${company.name}`);
            console.log(`Empty topics removed: ${removedTopics}`);
            console.log(`Empty rounds removed: ${removedRounds}`);
        }

        console.log("\nCompany data cleanup completed!");
        process.exit(0);

    } catch (error) {
        console.error("Cleanup failed:", error);
        process.exit(1);
    }
}

cleanCompanyData();