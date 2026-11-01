import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, Code, CheckCircle2, Circle, Filter } from "lucide-react";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [company, setCompany] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const companies = ["All", "TCS", "Infosys", "Cognizant", "Accenture", "HCLTech"];

    const fetchQuestions = async () => {
        try {
            setError("");
            const [questionResponse, progressResponse] = await Promise.all([
                api.get("/questions"),
                api.get("/question-progress")
            ]);

            setQuestions(questionResponse.data);
            setCompleted(progressResponse.data.completedQuestions);
        } catch (err) {
            setError("Unable to load questions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const toggleQuestion = async (id) => {
        try {
            const response = await api.post(`/questions/${id}/toggle`);
            setCompleted(response.data.completedQuestions);
        } catch (err) {
            alert("Unable to update question status.");
        }
    };

    const filteredQuestions = questions.filter((question) => {
        const companyMatch = company === "All" || question.company === company;
        const searchMatch =
            question.title.toLowerCase().includes(search.toLowerCase()) ||
            question.topic.toLowerCase().includes(search.toLowerCase());

        return companyMatch && searchMatch;
    });

    const solvedCount = completed.length;

    if (loading) return <div className="loading-state">Loading questions...</div>;

    return (
        <div className="dashboard-page">
            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">PRACTICE ARENA</span>
                    <h1>Coding Questions</h1>
                    <p>Practice placement preparation questions and track your progress.</p>
                </div>
            </div>

            <div className="question-overview">
                <div>
                    <Code size={23} />
                    <div>
                        <span>Total Questions</span>
                        <h2>{questions.length}</h2>
                    </div>
                </div>

                <div>
                    <CheckCircle2 size={23} />
                    <div>
                        <span>Solved Questions</span>
                        <h2>{solvedCount}</h2>
                    </div>
                </div>

                <div>
                    <Filter size={23} />
                    <div>
                        <span>Remaining</span>
                        <h2>{Math.max(0, questions.length - solvedCount)}</h2>
                    </div>
                </div>
            </div>

            <div className="question-toolbar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by question or topic..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >
                    {companies.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="questions-list">
                {filteredQuestions.map((question) => {
                    const isSolved = completed.includes(question._id);

                    return (
                        <div className="question-card" key={question._id}>
                            <button
                                className={`solve-button ${isSolved ? "solved" : ""}`}
                                onClick={() => toggleQuestion(question._id)}
                                title="Toggle solved status"
                            >
                                {isSolved
                                    ? <CheckCircle2 size={23} />
                                    : <Circle size={23} />
                                }
                            </button>

                            <div className="question-info">
                                <h3 className={isSolved ? "completed-title" : ""}>
                                    {question.title}
                                </h3>

                                <div className="question-meta">
                                    <span>{question.company}</span>
                                    <span>{question.topic}</span>
                                    <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                                        {question.difficulty}
                                    </span>
                                    <span className="practice-tag">Practice</span>
                                </div>
                            </div>

                            <span className={`status-tag ${isSolved ? "status-done" : "status-pending"}`}>
                                {isSolved ? "Solved" : "Pending"}
                            </span>
                        </div>
                    );
                })}

                {filteredQuestions.length === 0 && (
                    <div className="empty-state">
                        <Code size={35} />
                        <h3>No questions found</h3>
                        <p>Try changing your search or company filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Questions;