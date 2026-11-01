import { useEffect, useState } from "react";
import api from "../services/api";
import { NotebookPen, Plus, Trash2, Pencil, X, Save } from "lucide-react";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [company, setCompany] = useState("General");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchNotes = async () => {
        try {
            setError("");
            const response = await api.get("/notes");
            setNotes(response.data);
        } catch (err) {
            setError("Unable to load interview notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const resetForm = () => {
        setCompany("General");
        setQuestion("");
        setAnswer("");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            setError("Please enter an interview question.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const payload = {
                company,
                question: question.trim(),
                answer
            };

            if (editingId) {
                const response = await api.put(`/notes/${editingId}`, payload);

                setNotes((previous) =>
                    previous.map((item) =>
                        item._id === editingId ? response.data : item
                    )
                );
            } else {
                const response = await api.post("/notes", payload);
                setNotes((previous) => [response.data, ...previous]);
            }

            resetForm();
        } catch (err) {
            setError("Unable to save note. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const editNote = (note) => {
        setEditingId(note._id);
        setCompany(note.company);
        setQuestion(note.question);
        setAnswer(note.answer);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteNote = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes((previous) =>
                previous.filter((note) => note._id !== id)
            );

            if (editingId === id) resetForm();
        } catch (err) {
            setError("Unable to delete note.");
        }
    };

    if (loading) return <div className="loading-state">Loading interview notes...</div>;

    return (
        <div className="dashboard-page">
            <div className="page-heading">
                <div>
                    <span className="page-eyebrow">LEARN AND REVISE</span>
                    <h1>Interview Notes</h1>
                    <p>Save important interview questions and your own answers.</p>
                </div>
            </div>

            <div className="question-overview">
                <div>
                    <NotebookPen size={24} />
                    <div>
                        <span>Total Notes</span>
                        <h2>{notes.length}</h2>
                    </div>
                </div>
            </div>

            <div className="dashboard-panel notes-form-panel">
                <div className="panel-heading">
                    <div>
                        <h3>{editingId ? "Edit Interview Note" : "Add Interview Note"}</h3>
                        <p>Keep your important preparation points organized.</p>
                    </div>
                    {editingId ? <Pencil size={21} /> : <Plus size={21} />}
                </div>

                <form className="notes-form" onSubmit={handleSubmit}>
                    <label>Company</label>
                    <select
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    >
                        <option>General</option>
                        <option>TCS</option>
                        <option>Infosys</option>
                        <option>Cognizant</option>
                        <option>Accenture</option>
                        <option>HCLTech</option>
                        <option>Deloitte</option>
                    </select>

                    <label>Interview Question</label>
                    <input
                        type="text"
                        placeholder="Enter the interview question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />

                    <label>Your Answer / Notes</label>
                    <textarea
                        rows="4"
                        placeholder="Write your answer or important points..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    <div className="notes-form-actions">
                        <button type="submit" disabled={saving}>
                            <Save size={17} />
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Note"
                                    : "Save Note"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                <X size={17} /> Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="goal-list-section">
                <div className="section-heading">
                    <h3>Saved Interview Notes</h3>
                    <span>{notes.length} notes</span>
                </div>

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div className="note-card" key={note._id}>
                            <div className="note-card-top">
                                <span className="note-company">{note.company}</span>

                                <div>
                                    <button
                                        className="note-action"
                                        onClick={() => editNote(note)}
                                        title="Edit note"
                                    >
                                        <Pencil size={17} />
                                    </button>

                                    <button
                                        className="note-action delete-note"
                                        onClick={() => deleteNote(note._id)}
                                        title="Delete note"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>

                            <h3>{note.question}</h3>
                            <p>{note.answer || "No answer added yet."}</p>
                        </div>
                    ))}
                </div>

                {notes.length === 0 && (
                    <div className="empty-state">
                        <NotebookPen size={35} />
                        <h3>No interview notes yet</h3>
                        <p>Start saving important questions and answers above.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notes;