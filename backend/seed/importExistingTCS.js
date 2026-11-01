
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const dataPath = path.join(__dirname, "companyData.js");
const companyData = require(dataPath);

const tcs = companyData.find(company => company.name === "TCS");

if (!tcs) {
    throw new Error("TCS not found");
}

const round = tcs.rounds.find(
    item => item.name === "Round 1 - Foundation Assessment"
);

if (!round) {
    throw new Error("TCS Round 1 not found");
}

// Convert topic names into topic objects
round.topics = round.topics.map(topic =>
    typeof topic === "string"
        ? { name: topic, description: "", questions: [] }
        : topic
);

const topicFiles = {
    "Quantitative Aptitude": "seedTCSQuestions.js",
    "Logical Reasoning": "seedTCSLogical.js",
    "Verbal Ability": "seedTCSVerbal.js",
    "Numerical Ability": "seedTCSNumerical.js",
    "Advanced Aptitude": "seedTCSAdvanced.js"
};

for (const [topicName, fileName] of Object.entries(topicFiles)) {
    const filePath = path.join(__dirname, "..", fileName);
    const source = fs.readFileSync(filePath, "utf8");

    const match = source.match(
        /const questions\s*=\s*(\[[\s\S]*?\]);/
    );

    if (!match) {
        throw new Error(`Questions not found in ${fileName}`);
    }

    const questions = vm.runInNewContext(`(${match[1]})`);

    const topic = round.topics.find(
        item => item.name === topicName
    );

    if (!topic) {
        throw new Error(`Topic not found: ${topicName}`);
    }

    topic.questions = questions;

    console.log(`${topicName}: ${questions.length} imported`);
}

fs.writeFileSync(
    dataPath,
    "module.exports = " + JSON.stringify(companyData, null, 4) + ";\n"
);

console.log("\nAll 75 TCS questions imported successfully!");
