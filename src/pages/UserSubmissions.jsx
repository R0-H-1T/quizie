// src/pages/UserSubmissions.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserSubmissions } from "../api/quizApi";
import { useNavigate } from "react-router-dom";

const UserSubmissions = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSubmissions = async () => {
            try {
                const result = await fetchUserSubmissions();
                setSubmissions(result);
            } catch (err) {
                setError("Failed to load submissions.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadSubmissions();
        }
    }, [user]);

    if (!user) return <p className="text-center mt-5">Please log in to view your submissions.</p>;
    if (loading) return <p className="text-center mt-5">Loading your submissions...</p>;
    if (error) return <p className="text-danger text-center mt-5">{error}</p>;

    return (
        <div className="container mt-5" style={{ width: "950px" }}>
            <h3 className="mb-4 text-center">My Quiz Submissions</h3>

            {submissions.length === 0 ? (
                <p className="text-muted text-center">You haven't submitted any quizzes yet.</p>
            ) : (
                <ul className="list-group">
                    {submissions.map((quiz) => (
                        <li
                            key={quiz.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/results/${quiz.id}`)} // navigate to result
                        >
                            <div>
                                <strong>{quiz.title}</strong><br />
                                <small className="text-muted">{quiz.quiz_code}</small>
                            </div>
                                <span className="badge bg-primary">{quiz.quiz_code}</span>
                          
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSubmissions;
