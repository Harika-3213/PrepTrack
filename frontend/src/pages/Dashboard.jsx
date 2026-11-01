import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Code, Target, Brain, NotebookPen,
    TrendingUp, Award, RefreshCw
} from "lucide-react";
import {
    ResponsiveContainer, PieChart, Pie, Cell,
    Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = async () => {
        try {
            setError("");
            const response = await api.get("/dashboard");
            setData(response.data);
        } catch (err) {
            setError("Unable to load dashboard. Please refresh.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return <div className="loading-state">Loading your dashboard...</div>;
    }

    if (error) {
        return (
            <div className="loading-state">
                {error}
                <button onClick={fetchDashboard}>Try Again</button>
            </div>
        );
    }

    const cards = [
        {
            title: "Total Questions",
            value: data.totalQuestions,
            subtitle: "Available for practice",
            icon: Code,
            color: "blue"
        },
        {
            title: "Solved Questions",
            value: data.completedQuestions,
            subtitle: `${data.codingPercent}% coding progress`,
            icon: Target,
            color: "green"
        },
        {
            title: "Goals Completed",
            value: `${data.completedGoals}/${data.totalGoals}`,
            subtitle: "Daily preparation goals",
            icon: Award,
            color: "orange"
        },
        {
            title: "Aptitude Accuracy",
            value: `${data.aptitudeAccuracy}%`,
            subtitle: `${data.aptitudeAttempted} questions attempted`,
            icon: Brain,
            color: "purple"
        }
    ];

    const chartData = [
        { name: "Coding", value: data.codingPercent },
        { name: "Goals", value: data.goalPercent },
        { name: "Aptitude", value: data.aptitudeAccuracy }
    ];

    const readinessData = [
        { name: "Completed", value: data.readiness },
        { name: "Remaining", value: 100 - data.readiness }
    ];

    const COLORS = ["#3157D5", "#E9EDF5"];

    return (
        <div className="dashboard-page">

            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">OVERVIEW</span>
                    <h1>Dashboard</h1>
                    <p>Track your preparation and stay focused on your goals.</p>
                </div>

                <button className="refresh-btn" onClick={fetchDashboard}>
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            <div className="stats-grid">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div className="stat-card" key={card.title}>
                            <div className={`stat-icon ${card.color}`}>
                                <Icon size={22} />
                            </div>

                            <p>{card.title}</p>
                            <h2>{card.value}</h2>
                            <span>{card.subtitle}</span>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-main-grid">

                <div className="dashboard-panel">
                    <div className="panel-heading">
                        <div>
                            <h3>Preparation Progress</h3>
                            <p>Your progress across different areas</p>
                        </div>
                        <TrendingUp size={21} />
                    </div>

                    <div className="progress-chart">
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3157D5" radius={[7, 7, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="progress-list">
                        {chartData.map((item) => (
                            <div className="progress-item" key={item.name}>
                                <div className="progress-label">
                                    <span>{item.name}</span>
                                    <strong>{item.value}%</strong>
                                </div>
                                <div className="progress-track">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-panel readiness-panel">
                    <div className="panel-heading">
                        <div>
                            <h3>Readiness Score</h3>
                            <p>Based on your preparation activity</p>
                        </div>
                        <Award size={21} />
                    </div>

                    <div className="readiness-chart">
                        <ResponsiveContainer width="100%" height={230}>
                            <PieChart>
                                <Pie
                                    data={readinessData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={68}
                                    outerRadius={90}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                >
                                    {readinessData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="readiness-center">
                            <h2>{data.readiness}%</h2>
                            <span>Readiness</span>
                        </div>
                    </div>

                    <div className="readiness-caption">
                        <NotebookPen size={17} />
                        <span>Keep practicing to improve your preparation score.</span>
                    </div>

                    <p className="score-note">
                        This is a preparation progress metric, not a prediction of placement or job selection.
                    </p>
                </div>
            </div>

            <div className="dashboard-panel bottom-summary">
                <div>
                    <h3>Your Preparation Summary</h3>
                    <p>Small consistent efforts lead to better results.</p>
                </div>

                <div className="summary-numbers">
                    <div>
                        <strong>{data.notesCount}</strong>
                        <span>Interview Notes</span>
                    </div>
                    <div>
                        <strong>{data.aptitudeCorrect}</strong>
                        <span>Correct Aptitude Answers</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;