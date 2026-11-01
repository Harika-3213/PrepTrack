require("dotenv").config();

const connectDB = require("../config/db");
const Company = require("../models/Company");

async function verifyAllCompanies() {
    try {
        await connectDB();

        const companies = await Company.find();

        for (const company of companies) {
            console.log(`\n${company.name}`);

            let total = 0;

            for (const round of company.rounds) {
                let roundTotal = 0;

                for (const topic of round.topics) {
                    const count = topic.questions.length;
                    roundTotal += count;
                    total += count;

                    console.log(`  ${round.name} → ${topic.name}: ${count}`);
                }

                console.log(`  Round total: ${roundTotal}`);
            }

            console.log(`TOTAL QUESTIONS: ${total}`);
        }

        console.log("\nCompany verification completed!");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

verifyAllCompanies();