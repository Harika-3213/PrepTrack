
const express = require("express");
const router = express.Router();

const Company = require("../models/Company");

// GET all companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find()
            .select("name description rounds.name rounds.description");

        res.status(200).json({
            success: true,
            count: companies.length,
            companies
        });
    } catch (error) {
        console.error("Get companies error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch companies"
        });
    }
});

// GET one company with all rounds, topics and questions
router.get("/:companyName", async (req, res) => {
    try {
        const company = await Company.findOne({
            name: {
                $regex: `^${req.params.companyName}$`,
                $options: "i"
            }
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company
        });
    } catch (error) {
        console.error("Get company error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch company details"
        });
    }
});

// GET questions for a particular topic
router.get("/:companyName/:roundName/:topicName", async (req, res) => {
    try {
        const company = await Company.findOne({
            name: {
                $regex: `^${req.params.companyName}$`,
                $options: "i"
            }
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        const round = company.rounds.find(
            item => item.name === req.params.roundName
        );

        if (!round) {
            return res.status(404).json({
                success: false,
                message: "Round not found"
            });
        }

        const topic = round.topics.find(
            item => item.name === req.params.topicName
        );

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found"
            });
        }

        res.status(200).json({
            success: true,
            company: company.name,
            round: round.name,
            topic: topic.name,
            count: topic.questions.length,
            questions: topic.questions
        });
    } catch (error) {
        console.error("Get topic questions error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch topic questions"
        });
    }
});

module.exports = router;
