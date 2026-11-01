import { useEffect, useState } from "react";
import api from "../services/api";
import { Target, Plus, Trash2, CalendarDays, CheckCircle2 } from "lucide-react";

function Goals() {
    const [goals, setGoals] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchGoals = async () => {
        try {
            setError("");
            const response = await api.get("/goals");
            setGoals(response.data);
        } catch (err) {
            setError("Unable to load goals.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const addGoal = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        setSaving(true);
        setError("");

        try {
            const response = await api.post("/goals", {
                title: title.trim(),
                dueDate: dueDate || null
            });

            setGoals((previous) => [response.data, ...previous]);
            setTitle("");
            setDueDate("");
        } catch (err) {
            setError("Unable to add goal. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const toggleGoal = async (goal) => {
        try {
            const response = await api.patch(`/goals/${goal._id}`, {
                completed: !goal.completed
            });

            setGoals((previous) =>
                previous.map((item) =>
                    item._id === goal._id ? response.data : item
                )
            );
        } catch (err) {
            setError("Unable to update goal.");
        }
    };

    const deleteGoal = async (id) => {
        try {
            await api.delete(`/goals/${id}`);
            setGoals((previous) => previous.filter((goal) => goal._id !== id));
        } catch (err) {
            setError("Unable to delete goal.");
        }
    };

    const completedCount = goals.filter((goal) => goal.completed).length;
    const percentage = goals.length
        ? Math.round((completedCount / goals.length) * 100)
        : 0;

    if (loading) return <div className="loading-state">Loading goals...</div>;

    return (
        <div className="dashboard-page">
            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">STAY CONSISTENT</span>
                    <h1>Daily Goals</h1>
                    <p>Plan your tasks and build a consistent preparation routine.</p>
                </div>
            </div>

            <div className="goal-summary">
                <div>
                    <Target size={25} />
                    <div>
                        <span>Total Goals</span>
                        <h2>{goals.length}</h2>
                    </div>
                </div>

                <div>
                    <CheckCircle2 size={25} />
                    <div>
                        <span>Completed</span>
                        <h2>{completedCount}</h2>
                    </div>
                </div>

                <div>
                    <div className="goal-percentage">{percentage}%</div>
                    <div>
                        <span>Completion Rate</span>
                        <h2>{percentage}%</h2>
                    </div>
                </div>
            </div>

            <div className="dashboard-panel goal-form-panel">
                <div className="panel-heading">
                    <div>
                        <h3>Add a New Goal</h3>
                        <p>What do you want to achieve?</p>
                    </div>
                    <Plus size={22} />
                </div>

                <form className="goal-form" onSubmit={addGoal}>
                    <input
                        type="text"
                        placeholder="Example: Solve 3 coding questions"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <button type="submit" disabled={saving}>
                        <Plus size={18} />
                        {saving ? "Adding..." : "Add Goal"}
                    </button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="goal-list-section">
                <div className="section-heading">
                    <h3>Your Goals</h3>
                    <span>{goals.length} tasks</span>
                </div>

                {goals.map((goal) => (
                    <div className={`goal-item ${goal.completed ? "goal-completed" : ""}`} key={goal._id}>
                        <button
                            className="goal-check"
                            onClick={() => toggleGoal(goal)}
                            title="Mark goal complete"
                        >
                            <CheckCircle2 size={22} />
                        </button>

                        <div className="goal-details">
                            <h3>{goal.title}</h3>
                            {goal.dueDate && (
                                <span>
                                    <CalendarDays size={14} />
                                    {new Date(goal.dueDate).toLocaleDateString("en-IN")}
                                </span>
                            )}
                        </div>

                        <span className={`status-tag ${goal.completed ? "status-done" : "status-pending"}`}>
                            {goal.completed ? "Completed" : "In Progress"}
                        </span>

                        <button
                            className="delete-btn"
                            onClick={() => deleteGoal(goal._id)}
                            title="Delete goal"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}

                {goals.length === 0 && (
                    <div className="empty-state">
                        <Target size={35} />
                        <h3>No goals added yet</h3>
                        <p>Add your first preparation goal above.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Goals;