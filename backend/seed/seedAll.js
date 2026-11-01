
require("dotenv").config();

const connectDB = require("../config/db");
const Company = require("../models/Company");

const companyData = require("./companyData");
const tcsRemainingRounds = require("./tcsRemainingRounds");
const otherCompanies = require("./otherCompanies");

// Convert topic names into a common object format
function normalizeTopic(topic) {
    if (typeof topic === "string") {
        return {
            name: topic,
            description: "",
            questions: []
        };
    }

    return {
        name: topic.name,
        description: topic.description || "",
        questions: topic.questions || []
    };
}

// Merge all incoming company data without deleting existing questions
function mergeCompanyData(allData) {
    const merged = new Map();

    for (const companyData of allData) {
        if (!merged.has(companyData.name)) {
            merged.set(companyData.name, {
                name: companyData.name,
                description: companyData.description || "",
                rounds: []
            });
        }

        const company = merged.get(companyData.name);

        for (const roundData of companyData.rounds || []) {
            let round = company.rounds.find(
                item => item.name === roundData.name
            );

            if (!round) {
                round = {
                    name: roundData.name,
                    description: roundData.description || "",
                    topics: []
                };

                company.rounds.push(round);
            }

            for (const rawTopic of roundData.topics || []) {
                const topicData = normalizeTopic(rawTopic);

                let topic = round.topics.find(
                    item => item.name === topicData.name
                );

                if (!topic) {
                    round.topics.push({
                        ...topicData
                    });
                } else {
                    if (topicData.description) {
                        topic.description = topicData.description;
                    }

                    if (topicData.questions.length > 0) {
                        topic.questions = topicData.questions;
                    }
                }
            }
        }
    }

    return Array.from(merged.values());
}

async function seedAll() {
    try {
        await connectDB();

        const allData = [
            ...companyData,
            ...tcsRemainingRounds,
            ...otherCompanies
        ];

        const finalCompanies = mergeCompanyData(allData);

        for (const companyDataItem of finalCompanies) {
            let company = await Company.findOne({
                name: companyDataItem.name
            });

            if (!company) {
                company = new Company({
                    name: companyDataItem.name,
                    description: companyDataItem.description,
                    rounds: []
                });
            }

            company.description = companyDataItem.description;

            for (const roundData of companyDataItem.rounds) {
                let round = company.rounds.find(
                    item => item.name === roundData.name
                );

                if (!round) {
                    company.rounds.push({
                        name: roundData.name,
                        description: roundData.description || "",
                        topics: []
                    });

                    round = company.rounds.find(
                        item => item.name === roundData.name
                    );
                }

                for (const topicData of roundData.topics) {
                    let topic = round.topics.find(
                        item => item.name === topicData.name
                    );

                    if (!topic) {
                        round.topics.push({
                            name: topicData.name,
                            description: topicData.description || "",
                            questions: topicData.questions || []
                        });
                    } else {
                        if (topicData.description) {
                            topic.description = topicData.description;
                        }

                        // Never replace existing questions with an empty array
                        if (
                            Array.isArray(topicData.questions) &&
                            topicData.questions.length > 0
                        ) {
                            topic.questions = topicData.questions;
                        }
                    }
                }
            }

            await company.save();

            console.log(
                `${companyDataItem.name} saved successfully`
            );
        }

        console.log("\nAll company data processed successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedAll();
