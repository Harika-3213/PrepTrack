import { useEffect, useState } from "react";
import api from "../services/api";
import { Brain, Plus, Trash2, Target, CheckCircle2 } from "lucide-react";

function Aptitude() {
    const [records, setRecords] = useState([]);
    const [topic, setTopic] = useState("");
    const [category, setCategory] = useState("Quantitative");
    const [attempted, setAttempted] = useState("");
    const [correct, setCorrect] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchRecords = async () => {
        try {
            setError("");
            const response = await api.get("/aptitude");
            setRecords(response.data);
        } catch (err) {
            setError("Unable to load aptitude records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const addRecord = async (e) => {
        e.preventDefault();

        const attemptedCount = Number(attempted);
        const correctCount = Number(correct);

        if (
            !topic.trim() ||
            attempted === "" ||
            correct === "" ||
            !Number.isInteger(attemptedCount) ||
            !Number.isInteger(correctCount) ||
            attemptedCount < 0 ||
            correctCount < 0 ||
            correctCount > attemptedCount
        ) {
            setError("Enter valid counts. Correct answers cannot exceed attempted questions.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const response = await api.post("/aptitude", {
                topic: topic.trim(),
                category,
                attempted: attemptedCount,
                correct: correctCount
            });

            setRecords((previous) => {
                const exists = previous.some(
                    (item) => item._id === response.data._id
                );

                return exists
                    ? previous.map((item) =>
                        item._id === response.data._id ? response.data : item
                    )
                    : [response.data, ...previous];
            });

            setTopic("");
            setAttempted("");
            setCorrect("");
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save record.");
        } finally {
            setSaving(false);
        }
    };

    const deleteRecord = async (id) => {
        try {
            await api.delete(`/aptitude/${id}`);
            setRecords((previous) =>
                previous.filter((item) => item._id !== id)
            );
        } catch (err) {
            setError("Unable to delete record.");
        }
    };

    const totalAttempted = records.reduce(
        (sum, item) => sum + item.attempted, 0
    );

    const totalCorrect = records.reduce(
        (sum, item) => sum + item.correct, 0
    );

    const accuracy = totalAttempted
        ? Math.round((totalCorrect / totalAttempted) * 100)
        : 0;

    if (loading) return <div className="loading-state">Loading aptitude tracker...</div>;

    return (
        <div className="dashboard-page">
            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">TEST YOUR SKILLS</span>
                    <h1>Aptitude Tracker</h1>
                    <p>Monitor your accuracy and improve your problem-solving skills.</p>
                </div>
            </div>

            <div className="aptitude-summary">
                <div className="aptitude-stat">
                    <Brain size={24} />
                    <span>Total Attempted</span>
                    <h2>{totalAttempted}</h2>
                </div>

                <div className="aptitude-stat">
                    <CheckCircle2 size={24} />
                    <span>Correct Answers</span>
                    <h2>{totalCorrect}</h2>
                </div>

                <div className="aptitude-stat">
                    <Target size={24} />
                    <span>Accuracy</span>
                    <h2>{accuracy}%</h2>
                </div>
            </div>

            <div className="dashboard-panel aptitude-form-panel">
                <div className="panel-heading">
                    <div>
                        <h3>Add Practice Record</h3>
                        <p>Record your performance topic by topic.</p>
                    </div>
                    <Plus size={22} />
                </div>

                <form className="aptitude-form" onSubmit={addRecord}>
                    <div>
                        <label>Topic Name</label>
                        <input
                            type="text"
                            placeholder="Example: Percentages"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Quantitative</option>
                            <option>Logical Reasoning</option>
                            <option>Verbal</option>
                        </select>
                    </div>

                    <div>
                        <label>Questions Attempted</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={attempted}
                            onChange={(e) => setAttempted(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Correct Answers</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={correct}
                            onChange={(e) => setCorrect(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={saving}>
                        <Plus size={18} />
                        {saving ? "Saving..." : "Save Record"}
                    </button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="goal-list-section">
                <div className="section-heading">
                    <h3>Performance Records</h3>
                    <span>{records.length} topics</span>
                </div>

                {records.map((item) => {
                    const itemAccuracy = item.attempted
                        ? Math.round((item.correct / item.attempted) * 100)
                        : 0;

                    return (
                        <div className="aptitude-record" key={item._id}>
                            <div className="aptitude-record-icon">
                                <Brain size={21} />
                            </div>

                            <div className="aptitude-record-info">
                                <h3>{item.topic}</h3>
                                <span>{item.category}</span>
                            </div>

                            <div className="aptitude-record-numbers">
                                <strong>{item.correct}/{item.attempted}</strong>
                                <span>Correct / Attempted</span>
                            </div>

                            <div className="accuracy-badge">{itemAccuracy}%</div>

                            <button
                                className="delete-btn"
                                onClick={() => deleteRecord(item._id)}
                                title="Delete record"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    );
                })}

                {records.length === 0 && (
                    <div className="empty-state">
                        <Brain size={35} />
                        <h3>No records yet</h3>
                        <p>Add your first aptitude practice record above.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Aptitude;