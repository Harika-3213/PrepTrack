
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Question = require("../models/Question");
const Goal = require("../models/Goal");
const Note = require("../models/Note");
const Aptitude = require("../models/Aptitude");
const Company = require("../models/Company");

router.use(auth);

// GET QUESTIONS WITH COMPANY / CATEGORY / PRIORITY FILTERS
router.get("/questions", async (req, res) => {
    try {
        const { company, category, priority, round, difficulty, search } = req.query;
        const filter = {};

        if (company) filter.company = company;
        if (category) filter.category = category;
        if (priority) filter.priority = priority;
        if (round) filter.round = round;
        if (difficulty) filter.difficulty = difficulty;

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const questions = await Question.find(filter).sort({
            priority: 1,
            company: 1,
            category: 1
        });

        // High priority first
        questions.sort((a, b) => {
            const order = { High: 0, Medium: 1 };
            return order[a.priority] - order[b.priority];
        });

        res.json(questions);
    } catch (error) {
        console.error("Fetch questions:", error);
        res.status(500).json({ message: "Unable to fetch questions" });
    }
});

// GET ONE QUESTION
router.get("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(question);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch question" });
    }
});

// GET QUESTION PROGRESS
router.get("/question-progress", async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            completedQuestions: user.completedQuestions.map(String)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch question progress" });
    }
});

// TOGGLE QUESTION STATUS
router.post("/questions/:id/toggle", async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const question = await Question.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const questionId = String(question._id);
        const completed = user.completedQuestions.map(String);

        if (completed.includes(questionId)) {
            user.completedQuestions = completed.filter(
                id => id !== questionId
            );
        } else {
            user.completedQuestions.push(questionId);
        }

        await user.save();

        res.json({
            message: "Question progress updated",
            completedQuestions: user.completedQuestions.map(String)
        });
    } catch (error) {
        console.error("Toggle question:", error);
        res.status(500).json({ message: "Unable to update progress" });
    }
});

// GET GOALS
router.get("/goals", async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch goals" });
    }
});

// ADD GOAL
router.post("/goals", async (req, res) => {
    try {
        const { title, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Goal title is required" });
        }

        const goal = await Goal.create({
            user: req.user._id,
            title: title.trim(),
            dueDate: dueDate || null
        });

        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ message: "Unable to add goal" });
    }
});

// UPDATE GOAL
router.patch("/goals/:id", async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        if (typeof req.body.title === "string" && req.body.title.trim()) {
            goal.title = req.body.title.trim();
        }

        if (typeof req.body.completed === "boolean") {
            goal.completed = req.body.completed;
        }

        if (req.body.dueDate !== undefined) {
            goal.dueDate = req.body.dueDate || null;
        }

        await goal.save();
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: "Unable to update goal" });
    }
});

// DELETE GOAL
router.delete("/goals/:id", async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.json({ message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete goal" });
    }
});

// GET NOTES
router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch notes" });
    }
});

// ADD NOTE
router.post("/notes", async (req, res) => {
    try {
        const { company, question, answer } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({ message: "Question is required" });
        }

        const note = await Note.create({
            user: req.user._id,
            company: company || "General",
            question: question.trim(),
            answer: answer || ""
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Unable to add note" });
    }
});

// UPDATE NOTE
router.put("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.company = req.body.company || note.company;
        note.question = req.body.question || note.question;
        note.answer = req.body.answer ?? note.answer;

        await note.save();
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Unable to update note" });
    }
});

// DELETE NOTE
router.delete("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete note" });
    }
});

// GET APTITUDE
router.get("/aptitude", async (req, res) => {
    try {
        const data = await Aptitude.find({ user: req.user._id })
            .sort({ category: 1 });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch aptitude records" });
    }
});

// ADD OR UPDATE APTITUDE
router.post("/aptitude", async (req, res) => {
    try {
        const { topic, category, attempted, correct } = req.body;

        if (!topic || !category ||
            !["Quantitative", "Logical Reasoning", "Verbal"].includes(category)) {
            return res.status(400).json({ message: "Valid topic and category are required" });
        }

        const attemptedCount = Number(attempted);
        const correctCount = Number(correct);

        if (
            !Number.isInteger(attemptedCount) ||
            !Number.isInteger(correctCount) ||
            attemptedCount < 0 ||
            correctCount < 0 ||
            correctCount > attemptedCount
        ) {
            return res.status(400).json({ message: "Enter valid attempted and correct counts" });
        }

        const data = await Aptitude.findOneAndUpdate(
            { user: req.user._id, topic: topic.trim() },
            {
                user: req.user._id,
                topic: topic.trim(),
                category,
                attempted: attemptedCount,
                correct: correctCount
            },
            { returnDocument: "after", upsert: true, runValidators: true }
        );

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Unable to save aptitude data" });
    }
});

// DELETE APTITUDE
router.delete("/aptitude/:id", async (req, res) => {
    try {
        const data = await Aptitude.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!data) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Aptitude record deleted" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete aptitude record" });
    }
});

// DASHBOARD
router.get("/dashboard", async (req, res) => {
    try {
        const userId = req.user._id;

        const [
            totalQuestions,
            user,
            goals,
            aptitude,
            notesCount,
            totalCompanies,
            companies,
            totalRounds,
            questionCounts
        ] = await Promise.all([
            Question.countDocuments(),
            User.findById(userId),
            Goal.find({ user: userId }),
            Aptitude.find({ user: userId }),
            Note.countDocuments({ user: userId }),
            Company.countDocuments(),
            Company.find().select("name"),
            Company.aggregate([
                { $project: { roundCount: { $size: "$selectionRounds" } } },
                { $group: { _id: null, total: { $sum: "$roundCount" } } }
            ]),
            Question.aggregate([
                { $group: { _id: "$company", total: { $sum: 1 } } }
            ])
        ]);

        const completedQuestions = user.completedQuestions.length;
        const completedGoals = goals.filter(goal => goal.completed).length;

        const aptitudeAttempted = aptitude.reduce(
            (sum, item) => sum + item.attempted, 0
        );

        const aptitudeCorrect = aptitude.reduce(
            (sum, item) => sum + item.correct, 0
        );

        const codingPercent = totalQuestions
            ? Math.min(100, Math.round((completedQuestions / totalQuestions) * 100))
            : 0;

        const goalPercent = goals.length
            ? Math.round((completedGoals / goals.length) * 100)
            : 0;

        const aptitudePercent = aptitudeAttempted
            ? Math.round((aptitudeCorrect / aptitudeAttempted) * 100)
            : 0;

        const readiness = Math.round(
            (codingPercent + goalPercent + aptitudePercent) / 3
        );

        const companyProgress = companies.map(company => {
            const total = questionCounts.find(
                item => item._id === company.name
            )?.total || 0;

            const solved = user.completedQuestions.filter(async id => {
                const question = await Question.findById(id).select("company");
                return question && question.company === company.name;
            });

            return {
                name: company.name,
                totalQuestions: total,
                completedQuestions: 0
            };
        });

        // Calculate company-wise completed question counts
        const completedIds = user.completedQuestions.map(String);
        const completedCompanyQuestions = await Question.find({
            _id: { $in: completedIds }
        }).select("company");

        for (const item of companyProgress) {
            item.completedQuestions = completedCompanyQuestions.filter(
                question => question.company === item.name
            ).length;

            item.progress = item.totalQuestions
                ? Math.round((item.completedQuestions / item.totalQuestions) * 100)
                : 0;
        }

        res.json({
            totalCompanies,
            totalRounds: totalRounds[0]?.total || 0,
            totalQuestions,
            completedQuestions,
            totalGoals: goals.length,
            completedGoals,
            aptitudeAttempted,
            aptitudeCorrect,
            notesCount,
            codingPercent,
            goalPercent,
            aptitudeAccuracy: aptitudePercent,
            readiness,
            companyProgress
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Unable to load dashboard" });
    }
});

module.exports = router;
