
import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Building2,
    Layers3,
    ArrowLeft,
    BookOpen,
    GraduationCap,
    Code,
    ChevronRight,
    MessageSquare,
    Lightbulb
} from "lucide-react";

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Fetch all companies
    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/companies");

            setCompanies(response.data.companies || []);
        } catch (err) {
            console.error("Companies loading error:", err);
            setError("Unable to load companies. Please check the backend server.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch complete company details, including topics and questions
    const handleCompanyClick = async (company) => {
        try {
            setDetailsLoading(true);
            setError("");

            const response = await api.get(
                `/companies/${encodeURIComponent(company.name)}`
            );

            setSelectedCompany(response.data.company);
        } catch (err) {
            console.error("Company details error:", err);
            setError("Unable to load company details. Please try again.");
        } finally {
            setDetailsLoading(false);
        }
    };

    // Back navigation
    const goBack = () => {
        if (selectedTopic) {
            setSelectedTopic(null);
        } else if (selectedRound) {
            setSelectedRound(null);
        } else if (selectedCompany) {
            setSelectedCompany(null);
        }
    };

    // Loading screen
    if (loading) {
        return <div className="loading-state">Loading companies...</div>;
    }

    // Error screen
    if (error && !selectedCompany) {
        return (
            <div className="error-message">
                {error}
                <button onClick={fetchCompanies}>Try Again</button>
            </div>
        );
    }

    // COMPANY DETAILS LOADING
    if (detailsLoading) {
        return (
            <div className="loading-state">
                Loading company details...
            </div>
        );
    }

    // TOPIC QUESTIONS VIEW
    if (selectedTopic && selectedRound && selectedCompany) {
        const questions = selectedTopic.questions || [];

        return (
            <div className="dashboard-page">
                <button className="company-back" onClick={goBack}>
                    <ArrowLeft size={18} />
                    Back to Topics
                </button>

                <div className="company-detail-banner">
                    <div className="company-large-icon">
                        <BookOpen size={34} />
                    </div>

                    <span className="page-eyebrow">
                        {selectedCompany.name} / {selectedRound.name}
                    </span>

                    <h1>{selectedTopic.name}</h1>

                    <p>
                        {selectedTopic.description ||
                            "Practice questions and explanations."}
                    </p>
                </div>

                <div className="company-round-heading">
                    <span className="page-eyebrow">
                        PRACTICE QUESTIONS
                    </span>
                    <h2>{questions.length} Questions</h2>
                </div>

                <div className="company-question-list">
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div
                                className="dashboard-panel company-question"
                                key={question._id || index}
                            >
                                <div className="panel-heading">
                                    <div>
                                        <span className="page-eyebrow">
                                            QUESTION {index + 1}
                                        </span>

                                        <h3>{question.question}</h3>
                                    </div>

                                    <MessageSquare size={22} />
                                </div>

                                {question.difficulty && (
                                    <span
                                        className={`role-chip ${question.difficulty.toLowerCase()}`}
                                    >
                                        {question.difficulty}
                                    </span>
                                )}

                                {question.options?.length > 0 && (
                                    <div className="company-options">
                                        {question.options.map(
                                            (option, optionIndex) => (
                                                <p key={optionIndex}>
                                                    <strong>
                                                        {String.fromCharCode(
                                                            65 + optionIndex
                                                        )}.
                                                    </strong>{" "}
                                                    {option}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}

                                {question.answer && (
                                    <div className="company-answer">
                                        <h4>
                                            <Lightbulb size={18} />
                                            Answer
                                        </h4>

                                        <p>{question.answer}</p>
                                    </div>
                                )}

                                {question.explanation && (
                                    <div className="company-explanation">
                                        <h4>Explanation</h4>
                                        <p>{question.explanation}</p>
                                    </div>
                                )}

                                {question.code && (
                                    <div className="company-code">
                                        <h4>
                                            <Code size={18} />
                                            Solution
                                        </h4>

                                        <pre>
                                            <code>{question.code}</code>
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <BookOpen size={35} />
                            <h3>No questions available</h3>
                            <p>
                                Questions for this topic will be added soon.
                            </p>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}
            </div>
        );
    }

    // TOPICS VIEW
    if (selectedRound && selectedCompany) {
        const topics = selectedRound.topics || [];

        return (
            <div className="dashboard-page">
                <button className="company-back" onClick={goBack}>
                    <ArrowLeft size={18} />
                    Back to Rounds
                </button>

                <div className="company-detail-banner">
                    <div className="company-large-icon">
                        <Layers3 size={34} />
                    </div>

                    <span className="page-eyebrow">
                        {selectedCompany.name} PREPARATION
                    </span>

                    <h1>{selectedRound.name}</h1>

                    <p>
                        {selectedRound.description ||
                            "Select a topic to practice."}
                    </p>
                </div>

                <div className="company-round-heading">
                    <span className="page-eyebrow">ROUND TOPICS</span>
                    <h2>Choose a Topic</h2>
                </div>

                <div className="company-grid">
                    {topics.map((topic, index) => (
                        <button
                            className="company-card"
                            key={topic._id || index}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            <div className="company-card-icon">
                                <BookOpen size={25} />
                            </div>

                            <h2>{topic.name}</h2>

                            <p>
                                {topic.description ||
                                    "Explore practice questions and answers."}
                            </p>

                            <div className="company-card-footer">
                                <span>
                                    <BookOpen size={16} />
                                    {topic.questions?.length || 0} Questions
                                </span>
                            </div>

                            <div className="company-explore">
                                Practice Topic
                                <ChevronRight size={16} />
                            </div>
                        </button>
                    ))}
                </div>

                {topics.length === 0 && (
                    <div className="empty-state">
                        <BookOpen size={35} />
                        <h3>No topics available</h3>
                    </div>
                )}
            </div>
        );
    }

    // ROUNDS VIEW
    if (selectedCompany) {
        const rounds = selectedCompany.rounds || [];

        return (
            <div className="dashboard-page">
                <button className="company-back" onClick={goBack}>
                    <ArrowLeft size={18} />
                    Back to Companies
                </button>

                <div className="company-detail-banner">
                    <div className="company-large-icon">
                        <Building2 size={34} />
                    </div>

                    <span className="page-eyebrow">
                        COMPANY PROFILE
                    </span>

                    <h1>{selectedCompany.name}</h1>

                    <p>{selectedCompany.description}</p>
                </div>

                <div className="company-round-heading">
                    <span className="page-eyebrow">
                        SELECTION PROCESS
                    </span>

                    <h2>Preparation Rounds</h2>

                    <p>
                        Select a round to explore its topics and questions.
                    </p>
                </div>

                <div className="company-rounds">
                    {rounds.map((round, index) => {
                        const topics = round.topics || [];

                        const questionCount = topics.reduce(
                            (total, topic) =>
                                total + (topic.questions?.length || 0),
                            0
                        );

                        return (
                            <button
                                className="dashboard-panel company-round"
                                key={round._id || index}
                                onClick={() => setSelectedRound(round)}
                            >
                                <div className="round-number">
                                    {index + 1}
                                </div>

                                <div className="round-content">
                                    <h3>{round.name}</h3>

                                    <p>
                                        {topics.length} Topics
                                        {" • "}
                                        {questionCount} Questions
                                    </p>

                                    <div className="round-topics">
                                        {topics.map((topic, topicIndex) => (
                                            <span
                                                key={topic._id || topicIndex}
                                            >
                                                {topic.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="company-explore">
                                        <BookOpen size={16} />
                                        Explore Round
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {rounds.length === 0 && (
                    <div className="empty-state">
                        <Layers3 size={35} />
                        <h3>No rounds available</h3>
                    </div>
                )}

                {error && (
                    <div className="error-message">{error}</div>
                )}
            </div>
        );
    }

    // ALL COMPANIES VIEW
    return (
        <div className="dashboard-page">
            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">
                        COMPANY PREPARATION
                    </span>

                    <h1>Explore Companies</h1>

                    <p>
                        Prepare for company-wise placement tests and interviews.
                    </p>
                </div>
            </div>

            <div className="company-count-banner">
                <GraduationCap size={28} />

                <div>
                    <strong>{companies.length} Companies</strong>
                    <p>Your placement preparation starts here.</p>
                </div>
            </div>

            <div className="company-grid">
                {companies.map((company) => (
                    <button
                        className="company-card"
                        key={company._id}
                        onClick={() => handleCompanyClick(company)}
                    >
                        <div className="company-card-icon">
                            <Building2 size={27} />
                        </div>

                        <h2>{company.name}</h2>

                        <p>{company.description}</p>

                        <div className="company-card-footer">
                            <span>
                                <Layers3 size={16} />
                                {(company.rounds || []).length} Rounds
                            </span>
                        </div>

                        <div className="company-explore">
                            <BookOpen size={16} />
                            Explore Preparation
                            <ChevronRight size={16} />
                        </div>
                    </button>
                ))}
            </div>

            {companies.length === 0 && (
                <div className="empty-state">
                    <Building2 size={35} />
                    <h3>No companies available</h3>
                    <p>Please check the backend company data.</p>
                </div>
            )}
        </div>
    );
}

export default Companies;
